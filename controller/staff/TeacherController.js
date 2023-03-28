const Teacher = require('../../model/Staff/Teacher');
const Admin = require('../../model/Staff/Admin');
const expressAsyncHandler = require('express');

const createTeacherCtrl = expressAsyncHandler(async (req, res)=>{

    const { name, email, password, dataEmployed, isSuspended, role, applicationStatus } = req.body;

    const teacherExists = await Teacher.findOne({ email });

    if(teacherExists){
        throw new Error('Professor já cadastrado');
    }
})

module.exports = {
    createTeacherCtrl
}