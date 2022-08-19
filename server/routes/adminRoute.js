const express = require('express');

const router =  express.Router();
const controller = require('../controllers/adminController')

router.get('/users/',controller.getAllUser)
router.get('/delete-user/:id',controller.getDeleteUser)
router.get('/block/:id',controller.getBlockUser)
router.get('/unblock/:id',controller.getUnBlockUser)




module.exports = router;

