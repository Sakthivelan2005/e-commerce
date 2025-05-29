const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { 
    type: String, 
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    minLength: 4
  },
  address: String,
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);