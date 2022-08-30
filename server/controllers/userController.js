/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();
const { make, verifyOtp } = require('../otp/otpcode');

const objectid = mongoose.Types.ObjectId;


const refreshTokens = []; // global
function generateAccessToken(user) {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15s',
    algorithm: 'HS256',
  });

}

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
        status: true,
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
    console.log(req.cookies)
    console.log(req.body);
    console.log('ksnkasndknknakasdasdaaaaaaaaaaaaaaaaaaaaaaa');
    const { email, password } = req.body;
    // check email
    const user = await User.findOne({ email, status: 1 });
    if (!user) {
      return res.status(401).json({ error: 'Access denied' });
    }
    // const blocked = await User.findOne({  status:1 });
    // if(!blocked) {
    //   return res.status(401).json({ error: 'Access Denied' });

    // }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid  Password' }); // 401 Unauthorized;
    }

    // if user
    // generate token

  
    const token = generateAccessToken(user);
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    refreshTokens.push(refreshToken);
    // store token in cookie


    res.cookie('jwt', token, { maxAge:4000, httpOnly: true }); // httponly for restrict access of cookie from client
    res.cookie('refreshToken', refreshToken, { httpOnly: true }); // httponly for restrict access of cookie from client
    return res.json({
      message: 'Login successfull',
      user,
      accessToken: token,
      refreshToken,
    });
  },
  logout: (req, res) => { 
    try {
      console.log('resss');
      console.log(req.cookies);
      res.clearCookie('jwt');
      res.clearCookie('refreshToken')
      return res.json({ message: 'logout successful' });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: 'logout failed' }); // 401 Unauthorized;
    }
  },
  getLoggedIn: (req, res) => {
    console.log(req.user); // full user data comes here
    const userDetails = req.user;
    console.log('inside get loggedIN');
    return res
      .status(200)
      .json({ message: 'User is still logged in', userDetails });
  },
  getToken: async (req, res) => {
    console.log(req.cookies);

    // normally store in database
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken === null)
      return res.status(401).json({ error: 'No refresh token' });
    if (!refreshTokens.includes(refreshToken))
      return res.status(401).json({ error: "refresh token dosen't match" });
    // check if our current refresh token includes the refresh token that is sent to us
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,async  (err, user) => {
      const userId = user.userId
      if (err) return res.status(403).json({ error: 'not verified' });

   let token = generateAccessToken({ userId: user.userId });
   console.log(token)
   res.cookie('jwt', token, { maxAge:4000, httpOnly: true }); // httponly for restrict access of cookie from client

      const userDetails = await User.findOne({_id:objectid(userId) });
      console.log("userdetailssssss");
      console.log(userDetails);
      return res.json({ userDetails });
    });
  },
};
