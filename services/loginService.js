const { collection, doc, getDoc, query, where, getDocs, setDoc} = require('firebase/firestore');
const db = require('../data/firebase');
const Login = require('../models/loginModel');

const getLoginByEmail = async (email,password) => {
    console.log(email,password);
    // Buscar en la colección de logins
    const loginsRef = collection(db, 'logins');
    const qLogins = query(loginsRef,
        where('email', '==', email),
        where('password', '==', password));
    const querySnapshotLogins = await getDocs(qLogins);
    console.log(querySnapshotLogins);
    if (querySnapshotLogins.empty) {
        //const docSnap = querySnapshotLogins.docs[0];
        //return new Login(docSnap.id, docSnap.data().email, docSnap.data().password, docSnap.data().role);
        return  null;
    }
    const docSnap = querySnapshotLogins.docs[0];
    console.log(docSnap.data());
    return new Login(docSnap.id, docSnap.data().email, docSnap.data().password, docSnap.data().role);

    // Buscar en la colección de administradores
    // const adminsRef = collection(db, 'admins');
    // const qAdmins = query(adminsRef, where('email', '==', email));
    // const querySnapshotAdmins = await getDocs(qAdmins);
    // if (!querySnapshotAdmins.empty) {
    //     const docSnap = querySnapshotAdmins.docs[0];
    //     return new Login(docSnap.id, docSnap.data().email, docSnap.data().password, 'admin');
    // }
    // return null;
};
const createLogin = async (email,password,role) => {
const loginRef = doc(collection(db, 'logins'));
const response = await setDoc(loginRef, { email, password, role});
return response;
}

const getLoginById = async (email) => {

    const loginsRef = collection(db, 'forms');
    const qLogins = query(loginsRef,
        where('email', '==', email));
    const querySnapshotLogins = await getDocs(qLogins);
    console.log(querySnapshotLogins);
    const docSnap = querySnapshotLogins.docs[0];
    return docSnap.data();




    // Buscar en la colección de logins
    // const loginsRef = collection(db, 'logins');
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
    createLogin
};
