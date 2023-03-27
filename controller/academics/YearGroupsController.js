const YearGroup = require('../../model/Academic/YearGroup');
const Admin = require('../../model/Staff/Admin');
const expressAsyncHandler = require('express-async-handler');

const createYearGroup = expressAsyncHandler(async (req, res)=>{

    const { name, academicYear } = req.body;

    const yearGroupExists = await YearGroup.findOne({ name });

    if(yearGroupExists){
        throw new Error('Grupo já cadastrado');
    }

    const yearGroupCreated = await YearGroup.create({
        name,
        createdBy: req.userAuth._id,
        academicYear
    })

    const user = await Admin.findById(req.userAuth._id);
    user.yearGroup.push(yearGroupCreated)
    await user.save();

    res.json({
        status: 'success',
        message: 'Grupo cadastrado com sucesso',
        data: yearGroupCreated
    })
})

const getAllYearGroups = expressAsyncHandler(async (req, res)=>{

    const yearGroups = await YearGroup.find();

    res.json({
        status: 'success',
        message: 'Year Groups fetched successfully',
        data: yearGroups
    });
})

const getSingleYearGroup = expressAsyncHandler(async (req, res)=>{

})

module.exports = {
    createYearGroup,
    getAllYearGroups,
    getSingleYearGroup
}