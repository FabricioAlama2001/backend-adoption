const loginService = require('../services/loginService');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const login = await loginService.getLoginByEmail(email);
        if (!login || login.password !== password) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        res.status(200).send({ id: login.id, email: login.email, role: login.role });
    } catch (error) {
        res.status(500).send({ error: 'Error logging in', details: error.message });
    }
};

exports.loginById = async (req, res) => {
    try {
        const { id, password } = req.body;
        const login = await loginService.getLoginById(id);
        if (!login || login.password !== password) {
            return res.status(401).send({ error: 'Invalid ID or password' });
        }
        res.status(200).send({ id: login.id, email: login.email, role: login.role });
    } catch (error) {
        res.status(500).send({ error: 'Error logging in', details: error.message });
    }
};
