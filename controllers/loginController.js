const loginService = require('../services/loginService');

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const login = await loginService.getLoginByEmail(email, password);
        if (!login) {
            return res.status(401).send({error: 'Invalid email or password'});
        }
        res.status(200).send({id: login.id, email: login.email, role: login.role});
    } catch (error) {
        res.status(500).send({error: 'Error logging in', details: error.message});
    }
};

exports.createLogin = async (req, res) => {
    const {name, email, password, role} = req.body;
    const login = await loginService.createLogin(name, email, password, role);
    res.status(201).send({login});
}
exports.getFormByEmail = async (req, res) => {

    try {
        const {email} = req.body;

        const login = await loginService.getFormByEmail(email);

        if (!login) {
            return res.status(401).send({error: 'Invalid ID or password'});
        }

        res.status(200).send(login);
    } catch (error) {
        res.status(500).send({error: 'Error     logging in', details: error.message});
    }
};
