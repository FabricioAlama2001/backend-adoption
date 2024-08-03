require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Configuración del transportador utilizando SendGrid
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.MAIL_USER, // esto es 'apikey'
        pass: process.env.MAIL_PASSWORD // tu clave de API real de SendGrid
    }
});

const sendEmail = async (to, subject, templateName, variables) => {
    const templatePath = path.join(__dirname, '..', 'emailTemplates', `${templateName}.html`);
    let emailTemplate = fs.readFileSync(templatePath, 'utf8');

    // Asegúrate de que las variables contienen datos y no son null o undefined
    if (variables && typeof variables === 'object') {
        Object.keys(variables).forEach(key => {
            const value = variables[key];
            if (value) {
                emailTemplate = emailTemplate.replace(new RegExp(`{{${key}}}`, 'g'), value);
            }
        });
    }

    const mailOptions = {
        from: 'sfalama@espe.edu.ec', // Asegúrate de que esta dirección está verificada en SendGrid
        to: to,
        subject: subject,
        html: emailTemplate
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

module.exports = sendEmail;
