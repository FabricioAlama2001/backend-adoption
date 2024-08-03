
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.post('/', formController.createForm);
router.get('/', formController.getAllForms);
router.get('/summary', formController.getFormsSummary);
router.get('/rejected', formController.getRejectedForms);
router.get('/:id', formController.getFormById);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);
router.post('/:id/approve', formController.approveForm);
router.post('/:id/reject', formController.rejectForm);
router.post('/:id/reject', formController.rejectForm);
router.get('/rejected', formController.getRejectedForms);
module.exports = router;
