const expressAsyncHandler = require('express-async-handler');
const Teacher = require('../../model/Staff/Teacher');
const { hashPassword, isPasswordMatched } = require('../../utils/helpers');
const generateToken = require('../../utils/generateToken.js');

const createTeacherCtrl = expressAsyncHandler(async (req, res)=>{

    const { name, email, password } = req.body;

    const teacherExists = await Teacher.findOne({ email });

    if(teacherExists){
        throw new Error('Professor já cadastrado');
    }

    const hashedPassword = await hashPassword(password);

    const teacherCreated = await Teacher.create({
        name,
        email,
        password: hashedPassword
    });

    res.json({
        status: 'success',
        message: 'Professor criado com sucesso',
        data: teacherCreated
    })
})

const teacherLoginCtrl = expressAsyncHandler(async (req, res)=>{

    const { email, password} = req.body;

    const teacher = await Teacher.findOne({ email });

    if(!teacher){
        throw new Error('Professor não encontrado');
    }

    const isMatched = await isPasswordMatched(password, teacher?.password);

    if(!isMatched){
       res.json({ message: 'Senha inválida'});
       return;
    }

    res.json({
        status: 'success',
        message: 'Professor logado com sucesso',
        data: generateToken(teacher?._id)
    })

})

const getAllTeachersAdmin = expressAsyncHandler(async (req, res)=>{

    const teachers = await Teacher.find();

    res.json({
        status: 'success',
        message: 'Teacher fetched successfully',
        data: teachers
    });
})

const getSingleTeacherAdmin = expressAsyncHandler(async (req, res)=>{

    const teacher = await Teacher.findById(req.params.id);

    if(!teacher){
        throw new Error('Professor não encontrado');
    }

    res.json({
        status: 'success',
        message: 'Teacher fetched successfully',
        data: teacher
    });
})

module.exports = {
    createTeacherCtrl,
    teacherLoginCtrl,
    getAllTeachersAdmin,
    getSingleTeacherAdmin
    
}