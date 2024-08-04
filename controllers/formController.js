const formService = require('../services/formService');
const db = require("../data/firebase");

exports.createForm = async (req, res) => {
    try {
        const formData = req.body;
        const newForm = await formService.createForm(formData);
        res.status(201).send(newForm);
    } catch (error) {
        if (error.message === 'Email already exists') {
            res.status(400).send({error: 'Email already exists'});
        } else {
            res.status(500).send({error: 'Error creating form', details: error.message});
        }
    }
};

exports.getAllForms = async (req, res) => {
    try {
        const forms = await formService.getAllForms();
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send({error: 'Error fetching forms', details: error.message});
    }
};

exports.getFormById = async (req, res) => {
    try {
        const formId = req.params.id;
        const form = await formService.getFormById(formId);
        res.status(200).send(form);
    } catch (error) {
        res.status(404).send({error: 'Form not found', details: error.message});
    }
};

exports.updateForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const formData = req.body;
        const updatedForm = await formService.updateForm(formId, formData);
        res.status(200).send(updatedForm);
    } catch (error) {
        res.status(500).send({error: 'Error updating form', details: error.message});
    }
};

exports.deleteForm = async (req, res) => {
    try {
        const formId = req.params.id;
        await formService.deleteForm(formId);
        res.status(200).send({id: formId});
    } catch (error) {
        res.status(500).send({error: 'Error deleting form', details: error.message});
    }
};

exports.approveForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const updatedForm = await formService.approveForm(formId);
        res.status(200).send(updatedForm);
    } catch (error) {
        res.status(500).send({error: 'Error approving form', details: error.message});
    }
};

exports.rejectForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const updatedForm = await formService.rejectForm(formId);
        res.status(200).send(updatedForm);
    } catch (error) {
        res.status(500).send({error: 'Error rejecting form', details: error.message});
    }
};

// controllers/formController.js
exports.getUserForms = async (req, res) => {
    try {
        const email = req.params.email;
        const formsSnapshot = await getDocs(query(collection(db, 'forms'), where('email', '==', email)));
        const forms = formsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send({error: 'Error fetching user forms', details: error.message});
    }
};

exports.uploadPayment = async (req, res) => {
    try {
        const forms = await formService.uploadPayment(req.params.id,req.file);
        res.status(200).send(forms);
    } catch (error) {
        res.status(500).send({error: 'Error fetching forms', details: error.message});
    }
};



