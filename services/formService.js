const { collection, doc, setDoc, getDocs, getDoc, query, where, updateDoc, deleteDoc } = require('firebase/firestore');
const db = require('../data/firebase');
const Form = require('../models/formModel');
const Login = require('../models/loginModel');
const sendEmail = require('../utils/mailHelper');

const getFormByEmail = async (email) => {
    const formsRef = collection(db, 'forms');
    const q = query(formsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        return new Form(docSnap.id, ...Object.values(docSnap.data()));
    }
    return null;
};

const createForm = async (formData) => {
    const existingForm = await getFormByEmail(formData.email);
    if (existingForm) {
        throw new Error('Email already exists');
    }

    const newFormRef = doc(collection(db, 'forms'));
    const form = new Form(newFormRef.id, ...Object.values(formData));
    await setDoc(newFormRef, { ...formData });

    const loginRef = doc(collection(db, 'logins'), newFormRef.id);
    const login = new Login(newFormRef.id, formData.email, formData.password, 'client');
    await setDoc(loginRef, { email: login.email, password: login.password, role: login.role });


    await sendEmail(formData.email, 'Formulario de Adopción Recibido', 'formulario-recibido', {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email
    });

    await sendEmail('sfalama@espe.edu.ec', 'Nuevo Formulario de Adopción Recibido', 'aviso-admin', {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email
    });

    return form;
};

const getAllForms = async () => {
    const formsSnapshot = await getDocs(collection(db, 'forms'));
    const forms = formsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return forms;
};

const getFormsSummary = async () => {
    const formsSnapshot = await getDocs(collection(db, 'forms'));
    const formsSummary = formsSnapshot.docs.map(doc => ({
        id: doc.id,
        dni: doc.data().dni,
        name: doc.data().name,
        lastName: doc.data().lastName,
        email: doc.data().email,
        phoneNumber: doc.data().phoneNumber,
        address: doc.data().address,
        estadoValidacionFormulario: doc.data().estadoValidacionFormulario,
    }));
    return formsSummary.filter(form => form.estadoValidacionFormulario === 'pending');
};

const getFormById = async (id) => {
    const docRef = doc(db, 'forms', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new Error('Form not found');
    }
    const data = docSnap.data();
    return new Form(docSnap.id, ...Object.values(data));
};

const updateForm = async (id, formData) => {
    const formRef = doc(db, 'forms', id);
    await updateDoc(formRef, { ...formData });
    const updatedDoc = await getDoc(formRef);
    const data = updatedDoc.data();
    return new Form(updatedDoc.id, ...Object.values(data));
};

const deleteForm = async (id) => {
    const formRef = doc(db, 'forms', id);
    await deleteDoc(formRef);
    return { id };
};

const approveForm = async (id) => {
    const formRef = doc(db, 'forms', id);
    await updateDoc(formRef, { estadoValidacionFormulario: 'approved' });

    const updatedDoc = await getDoc(formRef);
    const data = updatedDoc.data();

    await sendEmail(data.email, 'Formulario Aprobado', 'formulario-aceptado', {
        name: data.name,
        lastName: data.lastName,
        email: data.email
    });

    return new Form(updatedDoc.id, ...Object.values(data));
};

const rejectForm = async (id) => {
    const formRef = doc(db, 'forms', id);
    await updateDoc(formRef, { estadoValidacionFormulario: 'rejected' });

    const updatedDoc = await getDoc(formRef);
    const data = updatedDoc.data();

    await sendEmail(data.email, 'Formulario Rechazado', 'formulario-denegado', {
        name: data.name,
        lastName: data.lastName,
        email: data.email
    });

    return new Form(updatedDoc.id, ...Object.values(data));
};

const getRejectedForms = async () => {
    const formsSnapshot = await getDocs(collection(db, 'forms'));
    const formsSummary = formsSnapshot.docs.map(doc => ({
        id: doc.id,
        dni: doc.data().dni,
        name: doc.data().name,
        lastName: doc.data().lastName,
        email: doc.data().email,
        phoneNumber: doc.data().phoneNumber,
        address: doc.data().address,
        estadoValidacionFormulario: doc.data().estadoValidacionFormulario,
    }));
    return formsSummary.filter(form => form.estadoValidacionFormulario === 'rejected');
};

module.exports = {
    createForm,
    getAllForms,
    getFormById,
    updateForm,
    deleteForm,
    getFormByEmail,
    approveForm,
    rejectForm,
    getFormsSummary,
    getRejectedForms
};
