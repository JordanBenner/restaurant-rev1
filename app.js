var express = require('express');
var body_parser = require('body-parser');
var app = express();
var promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: promise
});
var db = pgp({database: 'restaurant'});


app.set ('view engine', 'hbs');
const bodyParser = require('body-parser');
app.use(body_parser.urlencoded({extended: false}));
app.use('/static', express.static('public'))

app.post('/submit', function (request, response) {
  console.log(request.body);
  response.send('OK');
});

app.get('/search', function(req, resp, next) {
  let term = req.query.searchTerm;
  let query = "SELECT * FROM restaurant WHERE restaurant.name ILIKE '%$1#%'";
  db.any(query, term)
    .then(function(resultsArray) {
      resp.render('search.hbs', {
        results: resultsArray
      });
    })
    .catch(next);
});

app.listen(8002, function(){
  console.log('listening on port 8003')
})
