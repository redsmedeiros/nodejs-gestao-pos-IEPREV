const Program = require('../../model/Academic/Program');
const Admin = require('../../model/Staff/Admin');
const expressAsyncHandler = require('express-async-handler');

const createProgramCtrl = expressAsyncHandler(async (req, res)=>{

    const { name, description , duration} = req.body;

    const programExists = await Program.findOne({ name });

    if(programExists){
        throw new Error('Programa já cadastrado');
    }

    const createdProgram = await Program.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id
    })

    const user = await Admin.findById(req.userAuth._id);
    user.program.push(createdProgram._id)
    await user.save();

    res.json({
        status: 'success',
        message: 'Created successfully',
        data: createdProgram
    });


})

const getProgramsCtrl = expressAsyncHandler(async (req, res)=>{

    const programs = await Program.find();

    res.json({
        success: 'success',
        message: 'Programs fetched successfully',
        data: programs
    });

})

const getSingleProgramCtrl = expressAsyncHandler(async (req, res)=>{

    const program = await Program.findById(req.params.id);

    res.json({
        success: 'success',
        message: 'Program fetched successfully',
        data: program
    })
})

const updateProgramCtrl = expressAsyncHandler(async (req, res)=>{

    const { name , description, duration } = req.body;

    const programExists = await Program.findOne({ name });

    if(programExists){
        throw new Error('Programa já cadastrado');
    }

    const updatedProgram = await Program.findByIdAndUpdate(req.params.id,{
        name,
        description,
        duration,
        createdBy: req.userAuth._id
    }, { new: true });

    res.json({
        status: 'success',
        message: 'Updated successfully',
        data: updatedProgram
    });
})

const deleteProgramCtrl = expressAsyncHandler(async (req, res)=>{

    await Program.findByIdAndDelete(req.params.id);

    res.json({
        message: 'Deletado com sucessos',
        status: 'success'
    })

})

module.exports = {
    createProgramCtrl,
    getProgramsCtrl,
    getSingleProgramCtrl,
    updateProgramCtrl,
    deleteProgramCtrl
}