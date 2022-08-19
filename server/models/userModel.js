const mongoose = require('mongoose');

// created a object User{schema:{}}
const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    number: { type: Number, required: true },
    password: {
      type: String,
      required: true,
    },
    status: { type: Number, required: true} 

    
  },
  { collection: 'users' }
);

const model = mongoose.model('userData', User);
// We need to convert our Schema into a Model we can work with. To do so, we pass it into mongoose.model(modelName, schema):

// so you can use any name that you want for modelName but it should be meaning full

module.exports = model;
