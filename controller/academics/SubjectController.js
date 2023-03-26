const Subject = require('../../model/Academic/Subject');
const Admin = require('../../model/Staff/Admin');
const Program = require('../../model/Academic/Program');
const expressAsyncHandler = require('express-async-handler');

const createSubject = expressAsyncHandler(async(req, res)=>{

    const { name, description, academicTerm, duration } = req.body;

    const program = await Program.findById(req.params.programID);

    if(!program){
        throw new Error('Programa não cadastrado');
    }

    const subjectExists = await Subject.findOne({ name });

    if(subjectExists){
        throw new Error('View já cadastrada');
    }

    const createSubject = await Subject.create({
        name,
        description,
        academicTerm,
        duration,
        createdBy: req.userAuth._id
    })

    program.subjects.push(createSubject._id);
    await program.save();

    res.json({
        message: 'View criado com sucesso',
        status: 'sucess',
        data: createSubject
    })
})

const getAllSubjects = expressAsyncHandler(async (req, res)=>{

    const subjects = await Subject.find();

    if(!subjects){
        throw new Error('Não há assuntos cadastrados');
    }

    res.json({
        status: 'success',
        message: 'Subjects fetched successfully',
        data: subjects
    })
})

const getSingleSubject = expressAsyncHandler(async (req, res)=>{

    const subject = await Subject.findById(req.params.id);

    if(!subject){
        throw new Error('Assunto não encontrado');
    }

    res.json({
        status: 'success',
        message: 'Assunto fetched successfully',
        data: subject
    });

})

const updateSubject = expressAsyncHandler(async (req, res)=>{

    const { name, description, academicTerm, duration } = req.body;

    const subjectExists = await Subject.findOne({ name });

    if(subjectExists){
        throw new Error('Assunto já cadastrado');
    }

    const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, {
        name,
        description,
        duration,
        academicTerm,
        createdBy: req.userAuth._id 
    });

    res.json({
        status: 'success',
        message: 'Assuntos updated successfully',
        data: updatedSubject
    });

})

const deleteSubject = expressAsyncHandler(async (req, res)=>{

   const subjectDeleted = await Subject.findByIdAndDelete(req.params.id);

   if(!subjectDeleted){
    throw new Error('Assunto não encontrado');
   }

   res.json({
    status: 'success',
    message: 'Assunto deletado com seuccesso'
   });



})

module.exports = {
    createSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
    deleteSubject
}