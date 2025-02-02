const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/login', loginController.login);
router.post('/loginById', loginController.getFormByEmail);
router.post('/create-login', loginController.createLogin);
module.exports = router;
