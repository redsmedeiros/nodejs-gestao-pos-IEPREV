const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { createYearGroup, getAllYearGroups, getSingleYearGroup } = require('../../controller/academics/YearGroupsController');

const yearGroupRoute = express.Router();

yearGroupRoute.post('/', isLogin, isAdmin, createYearGroup);
yearGroupRoute.get('/', isLogin, isAdmin, getAllYearGroups);
yearGroupRoute.get('/:id', isLogin, isAdmin, getSingleYearGroup);

module.exports = yearGroupRoute;