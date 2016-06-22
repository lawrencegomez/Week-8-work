var
  express = require('express'),
  bodyParser = require('body-parser')
  app = express(),
  port = 3000,
  myQualms = ['World is gonna not end', 'people do fun of my grammer']


app.use(express.static('./public'))
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.render('index')
})

app.get('/qualms', function(req, res){
  res.json(myQualms)
})

app.post('/qualms', function(req, res){
// console.log(req.body.data);
  myQualms.push(req.body.data);
  console.log(myQualms);
})

app.listen(port, function(){
  console.log('Server is running on port: ', port);
})
