const express = require('express');
const isTeacher = require('../../middlewares/isTeacher');
const isTeacherLogin = require('../../middlewares/isTeacherLogin');

const { createExam, getAllExams, getSingleExam, updateExam, deleteExam } = require('../../controller/academics/ExamController');

const examRoute = express.Router();

examRoute.post('/', isTeacher, isTeacherLogin, createExam);
examRoute.get('/', isTeacher, isTeacherLogin, getAllExams);
examRoute.get('/:id', isTeacher, isTeacherLogin, getSingleExam);
examRoute.put('/:id', isTeacher, isTeacherLogin, updateExam);
examRoute.delete('/id', isTeacher, isTeacherLogin, deleteExam);

module.exports = examRoute;