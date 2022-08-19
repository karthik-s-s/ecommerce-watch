/* eslint-disable consistent-return */
const User = require('../models/userModel');
const mongoose = require("mongoose");
const objectid = mongoose.Types.ObjectId;

module.exports = {
  getAllUser: async (req, res) => {
    try {
      const allUsers = await User.find();
      return res.status(200).json({ data: allUsers });
    } catch (error) {
      console.log('sssssssssssssss');
      console.log(error);
      console.log(error);
      return res.status(403).json({ error: 'Failed to etch users data' });
    }
  },
  getDeleteUser: async (req, res) => {
    try {
        let userId = req.params.id
        console.log(userId);
       await User.deleteOne({_id:objectid(userId)})
       return res.status(200).json({ message: 'User deleted successfully' });
        

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error deleting user' });
    }
  },
  getBlockUser: async (req, res) => {
    try {
        console.log(req.params.id);
       let userId = req.params.id
       console.log(userId);
       await User.updateOne({_id:objectid(userId)},
        {$set:{status:false}
       })
       return res.status(200).json({ message: 'User Blocked successfully' });
        

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error Blocking user' });
    }
  },
  getUnBlockUser: async (req, res) => {
    try {
        let userId = req.params.id
        await User.updateOne({_id:objectid(userId)},
        {$set:{status:true}
       })
       return res.status(200).json({ message: 'User Unblocked successfully' });
        

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error Unblocking user' });
    }
  }
};
