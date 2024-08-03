const { collection, doc, getDoc, query, where, getDocs } = require('firebase/firestore');
const db = require('../data/firebase');
const Login = require('../models/loginModel');

const getLoginByEmail = async (email) => {
    // Buscar en la colección de logins
    const loginsRef = collection(db, 'logins');
    const qLogins = query(loginsRef, where('email', '==', email));
    const querySnapshotLogins = await getDocs(qLogins);
    if (!querySnapshotLogins.empty) {
        const docSnap = querySnapshotLogins.docs[0];
        return new Login(docSnap.id, docSnap.data().email, docSnap.data().password, docSnap.data().role);
    }

    // Buscar en la colección de administradores
    const adminsRef = collection(db, 'admins');
    const qAdmins = query(adminsRef, where('email', '==', email));
    const querySnapshotAdmins = await getDocs(qAdmins);
    if (!querySnapshotAdmins.empty) {
        const docSnap = querySnapshotAdmins.docs[0];
        return new Login(docSnap.id, docSnap.data().email, docSnap.data().password, 'admin');
    }

    return null;
};

const getLoginById = async (id) => {
    console.log(`Looking for ID: ${id} in logins and admins collections`);

    // Buscar en la colección de logins
    const loginsRef = collection(db, 'logins');
    const docSnapLogins = await getDoc(doc(loginsRef, id));
    if (docSnapLogins.exists()) {
        const data = docSnapLogins.data();
        console.log(`Found in logins: ${JSON.stringify(data)}`);
        return new Login(docSnapLogins.id, data.email, data.password, data.role);
    }

    // Buscar en la colección de administradores
    const adminsRef = collection(db, 'admins');
    const docSnapAdmins = await getDoc(doc(adminsRef, id));
    if (docSnapAdmins.exists()) {
        const data = docSnapAdmins.data();
        console.log(`Found in admins: ${JSON.stringify(data)}`);
        return new Login(docSnapAdmins.id, data.email, data.password, 'admin');
    }

    console.log('ID not found in either collection');
    return null;
};

module.exports = {
    getLoginByEmail,
    getLoginById,
};
