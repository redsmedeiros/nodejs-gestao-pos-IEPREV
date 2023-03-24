const ClassLevel = require('../../model/Academic/ClassLevel');
const Admin = require('../../model/Staff/Admin');
const expressAsyncHandler = require('express-async-handler');

const createClassLevelCtrl = expressAsyncHandler(async (req, res)=>{

    const { name, description } = req.body;

    const classLevelExist = await ClassLevel.findOne({ name });

    if(classLevelExist){
        throw new Error('ClassLevel já cadastrada');
    }

    const classLevelCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id
    })

    const user = await Admin.findById(req.userAuth._id);
    user.classLevels.push(classLevelCreated._id);
    await user.save();

    res.json({
        success: 'success',
        message: "ClassLevel criado com sucesso",
        data: classLevelCreated
    })
})

const getAllClassLevels = expressAsyncHandler(async (req, res)=>{

    const classLevels = await ClassLevel.find();

    res.json({
        success: 'success',
        message: 'ClassLevel fetched',
        data: classLevels
    })

})

const singleClassLevel = expressAsyncHandler(async (req, res)=>{

    const singleClassLevel = await ClassLevel.findById(req.params.id);

    res.json({
        success: 'sucess',
        message: 'Single class fetched',
        data: singleClassLevel
    })
})

const updateClassLevel = expressAsyncHandler(async (req, res)=>{

    const { name , description} = req.body;

    const classLevelExist = await ClassLevel.findOne({ name });

    if(classLevelExist){
        throw new Error('Class level já cadastrada');
    }

    const updatedClassLevel = await ClassLevel.findByIdAndUpdate(req.params.id, {
        name,
        description,
        createdBy: req.userAuth._id
    }, { new: true });

    res.json({
        status: 'success',
        message: 'Class level updated',
        data: updatedClassLevel
    })
})

const deletedClassLevel = expressAsyncHandler(async (req, res)=>{

    await ClassLevel.findByIdAndDelete(req.params.id);

    res.json({
        success: 'success',
        message: 'Class level deletado com sucesso'
    })

})

module.exports = {
    createClassLevelCtrl,
    getAllClassLevels,
    singleClassLevel,
    updateClassLevel,
    deletedClassLevel
}