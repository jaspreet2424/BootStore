const nodemailer = require("nodemailer");
require('dotenv').config();
const company_mail = process.env.GMAIL;
const company_mail_pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: company_mail,
    pass: company_mail_pass,
  },
});

const mutations = {
  contactMessage: async (_, { name, email, mobile, profession, message }) => {
    const clientMessage = {
      from: email,
      to: company_mail,
      subject: "Message from Client",
      text: `
            Name : ${name}
            Email : ${email}
            mobile : ${mobile}
            Profession : ${profession}
            Enquiry : ${message}
            `,
    };

    const clientResponseMsg = {
      from : company_mail,
      to : email,
      subject : "E-Book Store",
      text : `Hey ${name} thanks for contacting us , your response has been received and we are gratefull for your positive response . I hope you are satisfied with your services. Stay connected with us to enjoy more facilities in the future.`,
    }

    await transport.sendMail(clientMessage);

    await transport.sendMail(clientResponseMsg);

    const response = {
      success : true,
      message : "Message sent successfully",
    }

    return response
  },
};

const resolver = { mutations };

module.exports = resolver;
