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

module.exports = {
    createSubject
}