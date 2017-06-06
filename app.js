var express = require('express');



const bodyParser = require('body-parser');
app.use(body_parser.urlencoded({extended: false}));
app.post('/submit', function (request, response) {
  console.log(request.body);
  response.send('OK');
});

app.listen(8002, function(){
  console.log('listening on port 8003')
})
