const mongoose = require('mongoose');

const GoogleUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  googleUser: { type: Boolean, default: false }
});

module.exports = mongoose.model('GoogleUsers', GoogleUserSchema);
