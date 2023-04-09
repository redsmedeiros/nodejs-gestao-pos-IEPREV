const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');
const isTeacher = require('../../middlewares/isTeacher')

const { 
    createTeacherCtrl, 
    teacherLoginCtrl,
    getAllTeachersAdmin,
    getSingleTeacherAdmin,
    getTeacherProfile,
    updateTeacherProfileCtrl
} = require('../../controller/staff/TeacherController');

const teacherRoute = express.Router();

teacherRoute.post('/admin/register', isLogin, isAdmin, createTeacherCtrl);
teacherRoute.post('/login', teacherLoginCtrl);
teacherRoute.get('/admin/teachers', isLogin, isAdmin, getAllTeachersAdmin);
teacherRoute.get('/profile', isTeacherLogin, isTeacher, getTeacherProfile);
teacherRoute.get('/admin/teacher/:id', isLogin, isAdmin, getSingleTeacherAdmin);
teacherRoute.put('/updateProfile', isTeacherLogin, isTeacher, updateTeacherProfileCtrl);

module.exports = teacherRoute;