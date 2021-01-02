const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: String,
  username: { type: String, required: true },
  password: { type: String },
});

userSchema.plugin(passportLocalMongoose, {selectFields: 'name username'});

module.exports = mongoose.model('User', userSchema);
