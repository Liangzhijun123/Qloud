const express = require('express');
const { handleUserSignup, handleUserSignin, handleUserforgotPassword, handleUserResetPassword } = require('../controllers/userControllers');

const router = express.Router()


router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin);
router.post('/forgot-password', handleUserforgotPassword);
router.post('/reset-password/:id/:token', handleUserResetPassword);

module.exports = router;