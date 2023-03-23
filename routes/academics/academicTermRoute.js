const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { 
    createAcademicTermCtrl, 
    getAllAcademicTermCtrl, 
    getSingleAcademicTermCtrl, 
    updateAcademicTerm,
    deleteAcademicTerm
} = require('../../controller/academics/academicTermController')

const academicTermRoute = express.Router();

//rotas
academicTermRoute.post('/', isLogin, isAdmin, createAcademicTermCtrl);
academicTermRoute.get('/', isLogin, isAdmin, getAllAcademicTermCtrl);
academicTermRoute.get('/:id', isLogin, isAdmin, getSingleAcademicTermCtrl);
academicTermRoute.put('/:id', isLogin, isAdmin, updateAcademicTerm);
academicTermRoute.delete('/:id', isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRoute;