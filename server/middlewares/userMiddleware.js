/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const User = require('../models/userModel');

exports.userRegisterValidator = (req, res, next) => {

  console.table(req.body);

  // user is not null
  req.check('userName', 'user name is required').notEmpty(); // (req.body .name,message)
  console.log("usermiddleware2222222222");

  // email is not null , valid
  req.check('email', 'email is required').notEmpty();
  // check password
  req.check('password', 'password is required').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('password is must contail 6 character');
  req
    .check(
      'password',
      'password must contain one uppercase, lowercase, one number and one special character'
    )
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, 'i');

  // check error

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((err)=>err.msg)[0];
 
    return res.status(400).json({error:firstError});
  }


  next();
 
};

exports.userById = async (req, res, next) => 
{
  console.log(req._id)
  console.log("reqqqqqq");
  User.findById(req._id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: 'User not found' });
    }
    // add user object in req with all user info
    req.user = user;
    console.log(req.user);
    next();
  });
};
