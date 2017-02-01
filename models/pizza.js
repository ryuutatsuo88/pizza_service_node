// load the things we need
var mongoose = require('mongoose');

var pizza = mongoose.Schema({
  name : String,
  description : String,
},{
  timestamps   : true
});
module.exports = mongoose.model('Pizzas', pizza);
