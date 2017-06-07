var express = require('express');
var body_parser = require('body-parser');
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
      response.render('restaurant.hbs', {
        results: resultsArray
      });
    })
  resp.render('restaurant.hbs', {
    restaurant: restaurant
  });
});

app.get('/post/:slug', function(request, response) {
  var slug = request.params.slug;
  response.send('Post About: ' + slug);
});

// app.post('/submit', function (request, response) {
//   console.log(request.body);
//   response.send('OK');
// });




app.listen(8002, function() {
  console.log('listening on port 8003')
});
