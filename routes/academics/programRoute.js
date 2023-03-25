const express = require('express')
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { 
    createProgramCtrl, 
    getProgramsCtrl,
    getSingleProgramCtrl,
    updateProgramCtrl,
    deleteProgramCtrl 
} = require('../../controller/academics/ProgramsController');

const programRoute = express.Router();

//rotas
programRoute.post('/', isLogin, isAdmin, createProgramCtrl);
programRoute.get('/', isLogin, isAdmin, getProgramsCtrl);
programRoute.get('/:id', isLogin, isAdmin, getSingleProgramCtrl);
programRoute.put('/:id', isLogin, isAdmin, updateProgramCtrl);
programRoute.delete('/:id', isLogin, isAdmin, deleteProgramCtrl);

module.exports = programRoute;