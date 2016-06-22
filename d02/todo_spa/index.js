var
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')
  app = express(),
  port = 3000,
  Item = require('./models/item.js')


mongoose.connect('mongodb://localhost/todo-spa', function(err){
  if (err) return console.log(err);
  console.log("Connected to MongoDB (todo-spa)");
})

app.use(express.static('./public'))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile('public/index.html', { root: __dirname}); // __dirname is a global variable that is required with sendFile
})

app.get('/items', function(req, res){
  Item.find({}, function(err, items){
    if (err) return console.log(err);
    res.json(items);
  })
})

app.patch('/items/:id', function(req, res){
  Item.findById(req.params.id, function(err, item){
    if (err) throw err;
    // if (item.completed) {
    //   item.completed = false
    // } else {
    //   item.completed = true
    // }
    item.completed = !item.completed // toggle the items completed status
    item.save(function(err, item){
      if (err) throw err;
      res.json({serverSays: "Request completed", item: item})
    })
  })
})

app.patch('/item-content/:id', function(req, res){
  Item.findById(req.params.id, function(err, item){
    if (err) return console.log(err);
    item.content = req.body.data
    item.save(function(err, item){
      if (err) throw err
      res.json({item: item})
    })
  })
})

app.post('/items', function(req, res){
  Item.create({content: req.body.data.content}, function(err, item){
    if (err) return console.log(err);
    res.json({serverSays: "Request received", item: item})
  })
})

app.delete('/items/:id', function(req, res){
  Item.findById(req.params.id, function(err, item){
    if (err) throw err;
    item.remove();
    res.json({serverSays: "Successfully removed", item: item})
  })
})


app.listen(port, function() {
  console.log("script running from: ", __dirname);
  console.log("server is running on port : ", port);
})
