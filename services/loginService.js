const {collection, doc, getDoc, query, where, getDocs, setDoc} = require('firebase/firestore');
const db = require('../data/firebase');
const Login = require('../models/loginModel');

const getLoginByEmail = async (email, password) => {
    // Buscar en la colección de logins
    const loginsRef = collection(db, 'logins');

    const qLogins = query(loginsRef,
        where('email', '==', email),
        where('password', '==', password));

    const querySnapshotLogins = await getDocs(qLogins);

    if (querySnapshotLogins.empty) {
        return null;
    }

    const docSnap = querySnapshotLogins.docs[0];

    return new Login({
        id: docSnap.id,
        email: docSnap.data().email,
        password: docSnap.data().password,
        role: docSnap.data().role
    });
};

const createLogin = async (name, email, password, role) => {
    const loginRef = doc(collection(db, 'logins'));

    return await setDoc(loginRef, {name, email, password, role});
}

const getFormByEmail = async (email) => {
    const loginsRef = collection(db, 'forms');

    const qLogins = query(loginsRef,
        where('email', '==', email));

    const querySnapshotForm = await getDocs(qLogins);

    if (querySnapshotForm.empty) {
        throw new Error('No existe un formulario con ese email');
    }

    const docSnap = querySnapshotForm.docs[0];

    return docSnap.data();
};

module.exports = {
    getLoginByEmail,
    getFormByEmail,
    createLogin
};
