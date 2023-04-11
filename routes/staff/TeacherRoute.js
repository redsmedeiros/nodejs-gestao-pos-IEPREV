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
    updateTeacherProfileCtrl,
    adminUpdateTeacher
} = require('../../controller/staff/TeacherController');

const teacherRoute = express.Router();

teacherRoute.post('/admin/register', isLogin, isAdmin, createTeacherCtrl);
teacherRoute.post('/login', teacherLoginCtrl);
teacherRoute.get('/admin/teachers', isLogin, isAdmin, getAllTeachersAdmin);
teacherRoute.get('/profile', isTeacherLogin, isTeacher, getTeacherProfile);
teacherRoute.get('/admin/teacher/:id', isLogin, isAdmin, getSingleTeacherAdmin);
teacherRoute.put('/:teacherID/update', isTeacherLogin, isTeacher, updateTeacherProfileCtrl);
teacherRoute.put('/:teacherID/update/admin', isTeacherLogin, isTeacher, adminUpdateTeacher)

module.exports = teacherRoute;