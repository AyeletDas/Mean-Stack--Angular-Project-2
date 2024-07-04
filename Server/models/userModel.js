/*const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name : String,
  email : String,
  street : String,
  city : String,
  Zipcode : Number, 
  Tasks: [{"Title" : String}, {"Completed" : Boolean}],
  Posts: [{"Title" : String}, {"Body" : String}]

});

module.exports = mongoose.model('userModel',UserSchema,'user')
*/
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  street: String,
  city: String,
  zipcode: Number,
  Tasks: [{
    Title: String,
    Completed: Boolean
  }],
  Posts: [{
    Title: String,
    Body: String
  }]
});

module.exports = mongoose.model('userModel', UserSchema, 'user');




