const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { 
    createTeacherCtrl, 
    teacherLoginCtrl,
    getAllTeachersAdmin,
    getSingleTeacherAdmin
} = require('../../controller/staff/TeacherController');

const teacherRoute = express.Router();

teacherRoute.post('/admin/register', isLogin, isAdmin, createTeacherCtrl);
teacherRoute.post('/login', teacherLoginCtrl);
teacherRoute.get('/admin/teachers', isLogin, isAdmin, getAllTeachersAdmin);
teacherRoute.get('/admin/teacher/:id', isLogin, isAdmin, getSingleTeacherAdmin)

module.exports = teacherRoute;