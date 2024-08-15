const express = require('express');
const { signup, home,login,getUserData,updateUserData } = require('../controller/userController');
const route = express.Router();

const { isAuthenticated } = require('../middlewares/is_auth')
route.post('/signup', signup);
route.post('/login', login);
 route.get('/home',isAuthenticated, home);
 route.get('/getUserData',isAuthenticated, getUserData);
 route.post('/update',isAuthenticated, updateUserData);

module.exports = route;
