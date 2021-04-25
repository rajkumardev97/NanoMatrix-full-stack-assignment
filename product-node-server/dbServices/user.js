const User = require('../models/userModel')
const ObjectId = require('mongoose').Types.ObjectId

exports.save = (data) => new User(data).save();

exports.get = (idOrEmail, fieldName = "_id") => User.findOne({ [fieldName]: idOrEmail + "" });
 
exports.isUserExists = (idOrEmail, fieldName = "_id") => User.countDocuments({ [fieldName]: idOrEmail });

exports.updateUser=async (email,password)=>{
    try {
        let result =await User.findOneAndUpdate({email:email},{$set:{password:password}})
        return result
    } catch (err) {
        throw err;
    }
}
 