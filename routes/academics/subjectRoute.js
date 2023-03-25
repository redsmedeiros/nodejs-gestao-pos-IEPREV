const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { createSubject } = require('../../controller/academics/SubjectController');

const subjectRoute = express.Router()

//rotas
subjectRoute.post('/:programID', createSubject);

module.exports = subjectRoute