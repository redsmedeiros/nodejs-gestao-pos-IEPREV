const expressAsyncHandler = require('express-async-handler');
const Teacher = require('../../model/Staff/Teacher');
const { hashPassword } = require('../../utils/helpers');

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

module.exports = {
    createTeacherCtrl
}