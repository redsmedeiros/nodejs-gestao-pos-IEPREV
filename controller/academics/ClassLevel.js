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

module.exports = {
    createClassLevelCtrl
}