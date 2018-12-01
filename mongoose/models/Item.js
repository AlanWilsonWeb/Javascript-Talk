var mongoose = require('mongoose'),
    Schema = mongoose.Schema

const Item = new Schema({
  name: String,
  description: String,
  price: Number
  });


module.exports = mongoose.model('Item', Item);