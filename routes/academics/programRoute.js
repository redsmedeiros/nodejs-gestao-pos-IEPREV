const express = require('express')
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { 
    createProgramCtrl, 
    getProgramsCtrl,
    getSingleProgramCtrl,
    updateProgramCtrl 
} = require('../../controller/academics/ProgramsController');

const programRoute = express.Router();

//rotas
programRoute.post('/', createProgramCtrl);
programRoute.get('/', getProgramsCtrl);
programRoute.get('/:id', getSingleProgramCtrl);
programRoute.put('/:id', updateProgramCtrl)

module.exports = programRoute;