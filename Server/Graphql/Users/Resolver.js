const userCollection = require("../../Modals/User");
const bookCollection = require('../../Modals/Books');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const saltRounds = 10;
require("dotenv").config();
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
  createNewUser: async (_parent, { name, email, password }) => {
    if (!name || !email || !password) {
      return {
        success: false,
        message: "Missing input fields",
        statusCode: 422,
      };
    }

    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists with this email",
        statusCode: 400,
      };
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const date = new Date();
    const createdAt = `Account created on ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, at ${date.getHours()}:${date.getMinutes()}${
      date.getHours() >= 12 ? " pm" : " am"
    }`;
    const otp = Math.floor(Math.random() * (9999 - 1000) + 1000);

    const newInstance = new userCollection({
      name,
      email,
      password: hashPassword,
      otp: otp,
      createdAt: createdAt,
    });

    await newInstance.save();

    const otpVerificationMessage = {
      from: company_mail,
      to: email,
      subject: "E-Book Store",
      text: `Hey ${name} thanks for connecting with us , your response has been received and we are gratefull for your positive response . For futher operations you need to complete the verification process. This is your OTP to complete the registration process OTP-{${otp}}.`,
    };

    await transport.sendMail(otpVerificationMessage);

    return {
      success: true,
      message: "New User Created Successfully",
      statusCode: 200,
    };
  },

  verifyOTP: async (_parent, { email, otp }) => {
    if (!email || !otp) {
      return {
        success: false,
        message: "Missing input fields",
        statusCode: 422,
      };
    }

    const isUser = await userCollection.findOne({ email });

    if (!isUser) {
      return {
        success: false,
        message: "Invalid Email!",
        statusCode: 400,
      };
    }

    if (isUser.otp !== otp) {
      return {
        success: false,
        message: "Invalid OTP",
        statusCode: 400,
      };
    }

    isUser.otp = null;
    isUser.isVerified = true;

    await isUser.save();

    return {
      success: true,
      message: "Account Verified Successfully",
      statusCode: 200,
    };
  },

  loginUser: async (_parent, { email, password }) => {
    if (!email || !password) {
      return {
        success: false,
        message: "Missing input fields",
        statusCode: 422,
      };
    }

    const isUser = await userCollection.findOne({ email });

    if (!isUser) {
      return {
        success: false,
        message: "Invalid Email!",
        statusCode: 400,
      };
    }

    const isCorrectPassword = await bcrypt.compare(password, isUser.password);

    if (!isCorrectPassword) {
      return {
        success: false,
        message: "Incorrect Password",
        statusCode: 400,
      };
    }

    const token = await jwt.sign({ userId: isUser._id }, process.env.TOKEN_KEY);

    isUser.token = token;

    await isUser.save();

    return {
      success : true,
      message : token,
      statusCode : 200,
    }
  },

  addToWishlist: async (_parent, { userId, bookId }) => {
    const isUser = await userCollection.findById(userId);

    if (!isUser) {
      return {
        success: false,
        message: "Unauthorized access",
        statusCode: 400,
      };
    }

    const isBook = await bookCollection.findById(bookId);

    if (!isBook) {
      return {
        success: false,
        message: "Failed to add, no book found",
        statusCode: 400,
      };
    }

    isUser.wishList.push(isBook);

    await isUser.save();

    return {
      success: true,
      message: "Saved to wishlist",
      statusCode: 200,
    };
  },
};

const resolver = { mutations };

module.exports = resolver;
