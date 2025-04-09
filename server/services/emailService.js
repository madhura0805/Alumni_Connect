import nodemailer from 'nodemailer';

import dotenv from 'dotenv';



dotenv.config();



// Configure the email transporter

const transporter = nodemailer.createTransport({

  service: 'gmail',

  auth: {

    user: process.env.EMAIL_USER, 

    pass: process.env.EMAIL_PASS,  

  },

});

transporter.verify((error, success) => {

  if (error) {

    console.error("SMTP Connection Error:", error);

  } else {

    console.log("SMTP Connected Successfully!");

  }

});



export default transporter;