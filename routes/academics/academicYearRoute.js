const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { createAcademicyear, getAcademicYear, getSingleAcademicYear, updateAcademicYear, deleteAcademicYear } = require('../../controller/academics/AcademicYearController');

const academicYearRoute = express.Router();

//rotas
academicYearRoute.post('/', isLogin, isAdmin, createAcademicyear);
academicYearRoute.get('/', isLogin, isAdmin, getAcademicYear);
academicYearRoute.get('/:id', isLogin, isAdmin, getSingleAcademicYear);
academicYearRoute.put('/:id',isLogin, isAdmin, updateAcademicYear);
academicYearRoute.delete('/:id', isLogin, isAdmin, deleteAcademicYear);

module.exports = {
    academicYearRoute
}