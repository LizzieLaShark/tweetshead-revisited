var bcrypt = require('bcrypt');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); // check this, I think you only need it if your passing in Json?
var fs = require('fs');
var request = require('superagent')
var knexConfig = require('./knexfile')
var knex = require('knex')(knexConfig[process.env.NODE_ENV || "development"])

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'view')));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');

//add server
app.listen(process.env.PORT || 4000, function () {
  console.log('listening on port 4000!');
});

  ////ROUTES////
app.get('/sign-up', function(req, res) {
   res.render('sign-up')
});

app.get('/home', function(req, res) {
   res.render('home')
});

//// SIGN UP ////
app.post('/sign-up', function (req, res) {
  var hash = bcrypt.hashSync(req.body.password, 10);
  console.log("name", req.body.name, req.body.password)
  knex('users').insert({email: req.body.name, hashed_password: hash})
   .then(function(data){
    res.redirect('/home')
    console.log("successful", data)
    })
  .catch(function(error){
    console.log('Error', error)
    res.send('sign up error')
  })
});



module.exports = {
  app: app,
  knex: knex
}
