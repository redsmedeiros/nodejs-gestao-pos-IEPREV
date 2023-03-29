const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { createTeacherCtrl, teacherLoginCtrl } = require('../../controller/staff/TeacherController');

const teacherRoute = express.Router();

teacherRoute.post('/admin/register', isLogin, isAdmin, createTeacherCtrl);
teacherRoute.post('/login', teacherLoginCtrl);

module.exports = teacherRoute;