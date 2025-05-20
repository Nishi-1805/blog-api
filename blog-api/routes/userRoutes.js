const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../middlewares/validation/userValidation');
const handleValidationErrors = require('../middlewares/validation/handleValidation');

router.post('/register', validateRegister, handleValidationErrors, userController.register);

router.post('/login', validateLogin, handleValidationErrors, userController.login);

module.exports = router;
