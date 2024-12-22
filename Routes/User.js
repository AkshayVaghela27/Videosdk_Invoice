const express = require("express")
const {register , login, profile} = require("../Controllers/User")
const Auth = require("../Middleware/Auth")
const router = express.Router();

router.post('/register', register);

router.post('/login',login);

router.get('/profile',Auth,profile)


module.exports =router;
