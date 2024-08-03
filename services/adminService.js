const { collection, doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');
const db = require('../data/firebase');
const Admin = require('../models/adminModel');

const createAdmin = async (adminData) => {
    const newAdminRef = doc(collection(db, 'admins'));
    const admin = new Admin(newAdminRef.id, adminData.email, adminData.password);
    await setDoc(newAdminRef, { email: admin.email, password: admin.password });
    return admin;
};

const getAllAdmins = async () => {
    const snapshot = await getDocs(collection(db, 'admins'));
    return snapshot.docs.map(doc => new Admin(doc.id, doc.data().email, doc.data().password));
};

const getAdminById = async (id) => {
    const docRef = doc(db, 'admins', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        throw new Error('Admin not found');
    }
    const data = docSnap.data();
    return new Admin(docSnap.id, data.email, data.password);
};

const updateAdmin = async (id, adminData) => {
    const adminRef = doc(db, 'admins', id);
    await updateDoc(adminRef, { email: adminData.email, password: adminData.password });
    const updatedDoc = await getDoc(adminRef);
    const data = updatedDoc.data();
    return new Admin(updatedDoc.id, data.email, data.password);
};

const deleteAdmin = async (id) => {
    const adminRef = doc(db, 'admins', id);
    await deleteDoc(adminRef);
    return { id };
};

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
};
