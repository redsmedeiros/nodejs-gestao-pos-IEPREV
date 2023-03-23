const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { createClassLevelCtrl } = require('../../controller/academics/ClassLevel');

const classLevelRoute = express.Router();

//rotas
classLevelRoute.post('/', createClassLevelCtrl);

module.exports = classLevelRoute;