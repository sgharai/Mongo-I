const mongoose = require('mongoose');

const User = new mongoose.Schema({
  // TODO: write your schema here
  username: {
    type: String,
    required: [true, 'Need a username!']
  },
  password: {
    type: String,
    required: [true, 'Need a password!']
  },
  createdAt: {
    type: String,
    required: [true, 'Need to set to current date!'],
    default: new Date()
  }
});
const Blogpost = new mongoose.Schema({
  contents: {
    type: String,
    required: [true, 'Need some contents!']
  },
  header: {
    type: String,
    required: [true, 'Give me some heading!']
  }
});

module.exports = {
  User: mongoose.model('User', User, 'users'),
  Blogpost: mongoose.model('Blogpost', Blogpost, 'blogposts')
};
