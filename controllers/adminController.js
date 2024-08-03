const adminService = require('../services/adminService');

exports.createAdmin = async (req, res) => {
    try {
        const adminData = req.body;
        const newAdmin = await adminService.createAdmin(adminData);
        res.status(201).send(newAdmin);
    } catch (error) {
        res.status(500).send({ error: 'Error creating admin', details: error.message });
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.status(200).send(admins);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching admins', details: error.message });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await adminService.getAdminById(adminId);
        res.status(200).send(admin);
    } catch (error) {
        res.status(404).send({ error: 'Admin not found', details: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const adminData = req.body;
        const updatedAdmin = await adminService.updateAdmin(adminId, adminData);
        res.status(200).send(updatedAdmin);
    } catch (error) {
        res.status(500).send({ error: 'Error updating admin', details: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        await adminService.deleteAdmin(adminId);
        res.status(200).send({ id: adminId });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting admin', details: error.message });
    }
};
