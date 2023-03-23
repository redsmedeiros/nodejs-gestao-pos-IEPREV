const AcademicTerm = require('../../model/Academic/AcademicTerm');
const expressAsyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin');

const createAcademicTermCtrl = expressAsyncHandler(async (req, res)=>{

    const { name, description, duration} = req.body;

    const termExists = await AcademicTerm.findOne({ name });

    if(termExists){
        throw new Error('Termo já cadastrado');
    }

    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id
    })

    const user = await Admin.findById(req.userAuth._id);
    user.academicTerms.push(academicTermCreated._id);
    await user.save();

    res.json({
        status: 'success',
        message: "Criado com sucesso",
        data: academicTermCreated
    })

})

const getAllAcademicTermCtrl = expressAsyncHandler(async (req, res)=>{

    const academicTerms = await AcademicTerm.find();

    res.json({
        status: 'success',
        message: "Termos academicos success",
        data: academicTerms
    })

})

const getSingleAcademicTermCtrl = expressAsyncHandler(async (req, res)=>{

    const singleAcademicTerm = await AcademicTerm.findById(req.params.id);

    res.json({
        success: 'success',
        message: "single term fetched success",
        data: singleAcademicTerm
    })
})

const updateAcademicTerm = expressAsyncHandler(async (req, res)=>{

    const { name, description, duration } = req.body;

    const academicTermExist = await AcademicTerm.findOne({ name });

    if(academicTermExist){
        throw new Error('Termo acadêmico já cadastrado');
    }

    const updateAcademicTerm = await AcademicTerm.findByIdAndUpdate(req.params.id, {
        name,
        description,
        duration,
        createdBy: req.userAuth._id
    }, { new: true })

    res.json({
        status: 'success',
        message: 'Atualizado com sucesso',
        data: updateAcademicTerm
    })


})

const deleteAcademicTerm = expressAsyncHandler(async (req, res)=>{

    await AcademicTerm.findByIdAndDelete(req.params.id);

    res.json({
        success: 'success',
        message: 'Deletado com sucesso'
    })
})

module.exports = {
    createAcademicTermCtrl,
    getAllAcademicTermCtrl,
    getSingleAcademicTermCtrl,
    updateAcademicTerm,
    deleteAcademicTerm
}