const mongoose = require("mongoose");
Schema = mongoose.Schema;
mongoose.Promise = Promise;
const db = require("../connections/dbMaster");
const bcrypt = require("bcryptjs");

// Define our user schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    index: true,
    validate: [
      function (email) {
        let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return emailRegex.test(email);
      },
      "The e-mail is invalid.",
    ],
    trim: true,
    lowercase: true,
    required: true,
    set: function (v) {
      return `${v}`.toLowerCase();
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: [
      function (password) {
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return passwordRegex.test(password);
      },
      "Password should be alphanumeric.",
    ],
  },
  gender: {
    type: String,
    default: "male",
    enum: ["male", "female", "others"],
    set: function (v) {
      return v.toLowerCase().trim();
    },
  },
  profilePic: {
    type: String,
  },
  salt: {
    type: String,
    default: "",
  },
  isAdmin: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  resettoken: {
    type: String,
    required: false,
  },
});

UserSchema.pre("save", function (callback) {
  // let user=this
  // generatePasswordHash(user,callback)
  (this.salt = bcrypt.genSaltSync(20)),
    (this.password = bcrypt.hashSync(this.password, 10));
  callback();
});

UserSchema.pre("findOneAndUpdate", function (callback) {
  let updateObj = this._update.$set;
  if (updateObj && updateObj.password) {
    (updateObj.salt = bcrypt.genSaltSync(20)),
      (updateObj.password = bcrypt.hashSync(updateObj.password, 10));
  }
  callback();
});

UserSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = db.model("User", UserSchema);
