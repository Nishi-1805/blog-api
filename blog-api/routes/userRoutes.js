const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../middlewares/validation/userValidation');
const handleValidationErrors = require('../middlewares/validation/handleValidation');

// Register
router.post('/register', validateRegister, handleValidationErrors, userController.register);

// Login
router.post('/login', validateLogin, handleValidationErrors, userController.login);

module.exports = router;
