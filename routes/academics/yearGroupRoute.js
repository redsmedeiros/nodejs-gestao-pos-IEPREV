const express = require('express');
const isLogin = require('../../middlewares/isLogin');
const isAdmin = require('../../middlewares/isAdmin');
const { 
    createYearGroup, 
    getAllYearGroups, 
    getSingleYearGroup, 
    updateYearGroup, 
    deleteYearGroup 
} = require('../../controller/academics/YearGroupsController');

const yearGroupRoute = express.Router();

yearGroupRoute.post('/', isLogin, isAdmin, createYearGroup);
yearGroupRoute.get('/', isLogin, isAdmin, getAllYearGroups);
yearGroupRoute.get('/:id', isLogin, isAdmin, getSingleYearGroup);
yearGroupRoute.put('/:id', isLogin, isAdmin, updateYearGroup);
yearGroupRoute.delete('/:id', isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRoute;