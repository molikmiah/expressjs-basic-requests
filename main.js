// require main dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

// user the bodyParser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// respond with "Example App." when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

// normal http request to http://localhost:3000/user
app.get('/user', function(req, res) {
  res.status(200).send('Your user view has loaded...?');
});

// http POST request to http://localhost:3000/user
// post following in JSON format
// username = admin
// password = password123
// example payload:
// {
//   "user": "admin",
//   "password": "password123"
// }
app.post('/user', function(req, res) {
  var username = req.body.user;
  var password = req.body.password;
  console.log('user trying to log in is ' + username + '. Password is ' + password);

  // run logic here, e.g. verifying log in details with a database
  if (username === 'admin' && password === 'password123') {
    res.status(201).send(JSON.stringify({'message': 'done'}));
  }
  else {
    res.status(401).send('You do not have permission to access.');
  }
});

// listen on PORT 3000 as this service will run on localhost:3000
app.listen(3000, function () {
  console.log('Express App listening on port 3000!');
});