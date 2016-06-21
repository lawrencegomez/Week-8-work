var
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  port = 3000,
  ejsLayouts = require('express-ejs-layouts')

mongoose.connect('mongodb://localhost/ejs-practice-db', function(err){
  if (err) throw err;
  console.log("Mongoose database is up and running Captain (ejs-practice-db)");
})

// ejs is already in the node-modules folder so there is no need to require it above
app.set('view engine', 'ejs')

// Application-wide middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false})) // this allows us to submit form data
app.use(ejsLayouts)
app.use(express.static('./public')) //.static means "where do you want to point for your statis public folder"
// without the static folder, it wouldn't know where to go for the CSS and JS files

app.get('/', function(req, res){
  var myObj = {
    someKey: "Some awesome value",
    someOtherKey: "Some other awesome value",
  }
  var names = {
    me: "Lawrence Gomez Jr."
  }
  res.render('index', {myObj: myObj, names: names, title: "Duuuude"})
})

app.get('/about', function(req, res){
  var me = {
    name: "Lawrence Gomez Jr",
    age: 27,
    email: "lfg2305@gmail.com"
  }
  var favorites = {
    city: "Boston",
    town: "Wellesley",
    state: "Califronia"
  }
  res.render('about', {me: me, favorites: favorites, title: "About Me, brah!"})
})

app.get('/users/new', function(req, res){
  res.render('users/new', {title: "Sign up!"})
})

app.post('/users', function(req, res){
  console.log(req.body);
  res.redirect('/')
})

app.listen(port, function() {
  console.log('Server is running on port: ', port);
})
