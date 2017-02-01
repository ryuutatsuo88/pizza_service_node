// load the things we need
var mongoose = require('mongoose');

var topping = mongoose.Schema({
  name : String,
},{
  timestamps   : true
});
module.exports = mongoose.model('Toppings', topping);
