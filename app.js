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

var app = express();

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
  cookie: {maxAge: 60000}
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
