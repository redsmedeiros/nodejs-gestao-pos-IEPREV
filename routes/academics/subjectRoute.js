const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { 
    createSubject,
    getAllSubjects,
    getSingleSubject,
    updateSubject,
    deleteSubject
} = require('../../controller/academics/SubjectController');

const subjectRoute = express.Router();

//rotas
subjectRoute.post('/:programID', isLogin, isAdmin, createSubject);
subjectRoute.get('/:id', isLogin, isAdmin, getAllSubjects);
subjectRoute.get('/:id', isLogin, isAdmin, getSingleSubject);
subjectRoute.put('/:id', isLogin, isAdmin, updateSubject);
subjectRoute.delete('/:id', isLogin, isAdmin, deleteSubject);

module.exports = subjectRoute;