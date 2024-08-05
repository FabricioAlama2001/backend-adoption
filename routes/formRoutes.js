
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/uploads/payments');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Añadir timestamp para nombres únicos
    }
});

// Inicializar multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// Crear directorio 'uploads' si no existe
const fs = require('fs');
const dir = './assets/uploads/payments';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

router.post('/createForm', formController.createForm);
router.get('/', formController.getAllForms);
router.get('/:id', formController.getFormById);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);
router.post('/:id/approve', formController.approveForm);
router.post('/:id/reject', formController.rejectForm);
router.post('/:id/reject', formController.rejectForm);
router.get('/user/:userId', formController.getUserForms);
router.post('/:id/reject-comp', formController.rejectComp);
router.post('/:id/approve-comp', formController.approveComp);
router.post('/:id/upload-payment',upload.single('file'), formController.uploadPayment);

module.exports = router;
