var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  itemSchema = new Schema({
    content: String,
    completed: {type: Boolean, default: false},
    created_at: Date,
    updated_at: Date
  })

itemSchema.pre('save', function(next){
  var current_date = new Date
  this.updated_at = current_date
  if (!this.created_at) {
    this.created_at = current_date
  }
  next()
})

var Item = mongoose.model('Item', itemSchema)
module.exports = Item
