const express = require("express");

const router = express.Router();
const controller = require('../controllers/userController')
const {userRegisterValidator,userById}  = require('../middlewares/userMiddleware')
const {verifyToken} = require('../middlewares/userAuthMiddleWare')

router.post('/verification',controller.verification)
router.post('/verifyOtp',controller.otpVerify)
router.post("/signup",userRegisterValidator,controller.userSignUp);
router.get('/login',verifyToken,userById,controller.getLoggedIn)
router.post('/login',controller.login);
router.get('/logout',controller.logout);



module.exports = router;
