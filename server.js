const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');

User = models.User;
Blogpost = models.Blogpost;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(STATUS_USER_ERROR).json({ err: "didn't provide everything!" });
  }
  User.create(req.body).then(user => {
    res.json(user);
  });
});

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR).json({ err: 'no users!' });
    }
    res.json(users);
  });
});

server.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res
        .status(STATUS_SERVER_ERROR)
        .json({ err: 'no user by that id' });
    }
    res.json(user);
  });
});

server.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if (err) {
      res
        .status(STATUS_SERVER_ERROR)
        .json({ err: 'no user by that id to remove!' });
    }
    res.json(user);
  });
});

////////////////////////////////////////////////////////////
//BLOGPOSTS
///////////////////////////////////////////////////////////

server.post('/posts', (req, res) => {
  if (!req.body.contents || !req.body.header) {
    res.status(STATUS_USER_ERROR).json({ err: "didn't provide everything!" });
  }
  Blogpost.create(req.body).then(blogpost => {
    res.json(blogpost);
  });
});

server.get('/posts', (req, res) => {
  Blogpost.find({}, (err, blogposts) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR).json({ err: 'no blogposts!' });
    }
    res.json(blogposts);
  });
});

server.get('/posts/:id', (req, res) => {
  Blogpost.findById(req.params.id, (err, blogpost) => {
    if (err) {
      return res
        .status(STATUS_SERVER_ERROR)
        .json({ err: 'no blogpost by that id' });
    }
    res.json(blogpost);
  });
});

server.delete('/posts/:id', (req, res) => {
  Blogpost.findByIdAndRemove(req.params.id, (err, blogpost) => {
    if (err) {
      res
        .status(STATUS_SERVER_ERROR)
        .json({ err: 'no user by that id to remove!' });
    }
    res.json(blogpost);
  });
});

// TODO: write your server code here

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost:1111/collies', {
  useMongoClient: true
});

connect.then(
  () => {
    const port = 3000;
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  err => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  }
);
