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

    const yearGroup = await YearGroup.findById(req.params.id);

    if(!yearGroup){
        throw new Error('Grupo não encontrado');
    }

    res.json({
        status: 'success',
        message: 'Single Group fetched',
        data: yearGroup
    });

})

const updateYearGroup = expressAsyncHandler(async (req, res)=>{

    const { name, academicYear } = req.body;

    const yearGroupExists = await YearGroup.findOne({ name });

    if(yearGroupExists){
        throw new Error('Nome de grupo já cadastrado');
    }

    const updateYearGroup = await YearGroup.findByIdAndUpdate(req.params.id, {
        name,
        academicYear,
        createdBy: req.userAuth._id
    }, { new: true });

    res.json({
        status: "success",
        message: 'Grupo atualizado com sucesso',
        data: updateYearGroup
    });

})

const deleteYearGroup = expressAsyncHandler(async (req, res)=>{

    await YearGroup.findByIdAndDelete(req.params.id);

    res.json({
        status: 'success',
        message: 'Grupo deletado com sucesso',
    });
})

module.exports = {
    createYearGroup,
    getAllYearGroups,
    getSingleYearGroup,
    updateYearGroup,
    deleteYearGroup
}