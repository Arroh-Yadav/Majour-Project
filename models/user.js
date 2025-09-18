const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose); //we used it cause it aumatically does hashing,salting and adds a username to store them all.

module.exports = mongoose.model("User", userSchema);
