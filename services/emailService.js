const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transportista = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.enviarCorreo = async (a, asunto, texto) => {
  try {
    await transportista.sendMail({
      from: process.env.EMAIL_USER,
      to: a,
      subject: asunto,
      text: texto,
    });
    console.log('Correo enviado');
  } catch (error) {
    console.error('Error enviando correo:', error);
  }
};
