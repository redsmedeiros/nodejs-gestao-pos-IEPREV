const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { 
    createClassLevelCtrl,
    getAllClassLevels,
    singleClassLevel,
    updateClassLevel,
    deletedClassLevel 
} = require('../../controller/academics/ClassLevel');

const classLevelRoute = express.Router();

//rotas
classLevelRoute.post('/', isLogin, isAdmin, createClassLevelCtrl);
classLevelRoute.get('/', isLogin, isAdmin, getAllClassLevels);
classLevelRoute.get('/:id', isLogin, isAdmin, singleClassLevel);
classLevelRoute.put('/:id', isLogin, isAdmin, updateClassLevel);
classLevelRoute.delete('/:id', isLogin, isAdmin, deletedClassLevel);

module.exports = classLevelRoute;