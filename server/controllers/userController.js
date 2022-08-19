/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();
const { make, verifyOtp } = require('../otp/otpcode');

module.exports = {
  verification: async (req, res) => {
    // check already exists
    try {
      console.log(req.body);
      const user = await User.findOne({
        $or: [{ number: req.body.number }, { email: req.body.email }],
      });
      if (user) {
        return res.status(409).json({ error: 'User already exists' });
      }
      console.log(req.body.number);
      make(req.body.number).then((verification) => {
      console.log(verification);
        return res.status(200).json({ message: 'Verification successful' });
      });
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  },
  otpVerify: async (req, res) => {
    try {
      const otp = req.body.otp;
      const number = req.body.number;
      await verifyOtp(otp, number).then((responce) => {
        console.log(responce);
      return res.status(200).json({ responce });
      });
    } catch (error) {
      console.log(error);
      return res.status(403).json({ error });
    }
  },
  userSignUp: async (req, res) => {
    // check already exists
    // const userExist = await User.findOne({ email: req.body.email });
    // if (userExist) {
    //   return res.status(403).json({ error: 'User already exists' });
    //   // 403 the server understands the request but refuses to authorize it.||forbidden
    // }
    // create new user
    try {

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await User.create({
        name: req.body.userName,
        email: req.body.email,
        number: req.body.number,
        password: hashedPassword,
        status: true
      });

      return res
        .status(201)
        .json({ message: 'Signup Success! Please Login to Continue' });
      // 201 Created success status
    } catch (errors) {
      console.log(errors.message);
      // return res.status(403).json({ error: errors.message });//retuning mongodb error
      return res.status(403).json({ error: 'Email already registered' });
    }
  },
  // eslint-disable-next-line consistent-return
  login: async (req, res) => {
    const { email, password } = req.body;
    // check email
    const user = await User.findOne({ email ,status:1});
    if (!user) {
      return res.status(401).json({ error: 'Invalid Email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid  Password' }); // 401 Unauthorized;
    }

    // if user
    // generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
      algorithm: 'HS256',
    });
    // store token in cookie

    res.cookie('jwt', token, { expire: new Date() + 999, httpOnly: true }); // httponly for restrict access of cookie from client
    return res.json({
      message: 'Login successfull',
      user,
      accessToken: token
    });
  },
  logout: (req, res) => {
    try {
      console.log('resss');
      console.log(req.cookies);
      res.clearCookie('jwt');
      return res.json({ message: 'logout successful' });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: 'logout failed' }); // 401 Unauthorized;
    }
  },
  getLoggedIn: (req, res) => {
    const { userName } = req.user;
    return res
      .status(200)
      .json({ message: 'User is still logged in', userName });
  },
};
