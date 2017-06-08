var express = require('express');
var body_parser = require('body-parser');
var session = require(express-session);
var promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: promise
});
var db = pgp({
  database: 'restaurantv2'
});
function creat_hash(password){
  var pbkdf2 = require('pbkdf2');
  var crypto = require('crypto');
  var salt = crypto.randomBytes(20).toString('hex');
  var password = 'some-password';
  var key = pbkdf2.pbkdf2Sync(
  password, salt, 36000, 256, 'sha256'
  );
  var hash = key.toString('hex');
  return[hash, salt];
}
var pass_parts = stored_pass.split('$');
var key = pbkdf2.pbkdf2Sync();

function (stored_pss, password){
  password,
  pass_parts[2],
  parseInt(pass_parts[1]),
  256, 'sha256'

  var hash = key.toString('hex');
  if (hash === pass_parts[3]) {
    console.log('Passwords Matched!');
    return true;

  } else {
    console.log("Doesn't match")
  }
  return false;
}
var stuff = creat_hash('narf')
var hash = stuff[0];
var salt - stuff[1];
var stored_pass = `pbkdf2_sha256$36000$${salt}$${hash}`;

console.log(stored_pass);
var app = express();

var morgan = require('morgan');
app.use(morgan('dev'));

app.set('view engine', 'hbs');
// const bodyParser = require('body-parser');
app.use(body_parser.urlencoded({
  extended: false
}));
app.use('/static', express.static('public'))
app.use(session({
  secret: process.env.SECTET_KEY || 'dev',
  resave:true,
  saveUnititalized: false,
  cookie: {maxAge: 600000}
}));
//redirect to login //
app.use(function(req, resp, next){
  if (req.session.user){
    next();
  }else if (req.path =='/login'){

  }else {
        resp.redirect('/login');
  }
});

app.get('/', function(req, resp, next) {
  resp.render('homepage.hbs', {});
});

app.get('/search', function(request, response, next) {
  var search = request.query.searchTerm;
  var query = "SELECT * FROM restaurant WHERE restaurant.name ILIKE '%$1#%'";
  db.any(query, search)
    .then(function(resultsArray) {
      response.render('search.hbs', {
        results: resultsArray
      });
    })
    .catch(next);

});
app.get('/restaurant/:id', function(req, resp, next) {
  var id = request.params.id;
  var query = "SELECT * FROM restaurant WHERE id = $1";
  db.any(query, search)
    .then(function(resultsArray) {
      resp.render('restaurant.hbs', {
        restaurant: restaurant
      });

    });
})


app.get('/post/:slug', function(request, response) {
  var slug = request.params.slug;
  response.send('Post About: ' + slug);
});

app.get('/login', function (request, response) {
  response.render('login.hbs');
});
app.post('/login', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username == 'aaron' && password == 'narf') {
    request.session.user = username;
    response.redirect('/');
  } else {
    response.render('login.hbs');
  }
});



// app.post('/submit', function (request, response) {
//   console.log(request.body);
//   response.send('OK');
// });




app.listen(8002, function() {
  console.log('listening on port 8002')
});
