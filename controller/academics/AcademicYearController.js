//importar model
const AcademicYear = require('../../model/Academic/AcademicYear');
const asyncHandler = require('express-async-handler');
const Admin = require('../../model/Staff/Admin')

//controllers
const createAcademicyear = asyncHandler(async (req, res)=>{

    const { name, fromYear, toYear } = req.body;

    const academicYear = await AcademicYear.findOne({ name });

    const academicyearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id
    })

    if(academicYear){
        throw new Error('Ano acadêmico já cadastrado');
    }

    res.status(201).json({
        status: 'success',
        message: 'Academic year created successfully',
        data: academicyearCreated
    })

})

const getAcademicYear = asyncHandler(async (req, res)=>{

    const academicYear = await AcademicYear.find();

    res.status(201).json({
        status: 'success',
        message: "Academic years created successfully",
        data: academicYear
    })

})

const getSingleAcademicYear = asyncHandler(async (req, res)=>{

    const academicYear = await AcademicYear.findById(req.params.id);

    res.json({
        status: "success",
        message: "Academic year successfully",
        data: academicYear
    })
})

const updateAcademicYear = asyncHandler(async (req, res)=>{

    const { name, fromYear, toYear } = req.body;

    const academicYearFound = await AcademicYear.findOne({ name });

    if(academicYearFound){
        throw new Error('Ano academico já cadastrado');
    }

    const academicYear = await AcademicYear.findByIdAndUpdate(req.params.id, {
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth
    }, { new: true });

    res.json({
        status: "success",
        message: 'ok',
        data: academicYear
    })
})

const deleteAcademicYear = asyncHandler(async (req, res)=>{

    await AcademicYear.findByIdAndDelete(req.params.id);

    res.json({
        status: 'success',
        message: 'Academic year deleted successfully'
    });
})

module.exports = {
    createAcademicyear,
    getAcademicYear,
    getSingleAcademicYear,
    updateAcademicYear,
    deleteAcademicYear
}