// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var morgan       = require('morgan');
var bodyParser   = require('body-parser');
var configDB = require('./config/database.js');

var Pizza = require('./models/pizza.js');
var Topping = require('./models/topping.js');

// configuration ===============================================================
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/toppings', function(req, res) {
    Topping.find(function(err, toppings) {
        // if there are any errors, return the error
        if (err)
            res.json({'error': true, 'msg':  err});

        res.json({toppings: toppings});
    });
});

app.post('/toppings', function(req, res) {
    if (req.body.name) {
      Topping.findOne({ 'name' :  req.body.name }, function(err, topping) {
          // if there are any errors, return the error
          if (err) {
              res.json({'error': true, 'msg': err});
          }

          // if no user is found, return the message
          if (topping) {
              res.json({'error': true, 'msg': 'Topping already exists.'});
          } else {
            var top = new Topping();
            top["name"] = req.body.name
            top.save(function(err) {
                if (err)
                    res.json({'error': true, 'msg': err});

                res.json({"success": "added topping"});
            })
          }
      });
    } else {
      res.json({'error': true, 'msg': 'no topping to add'});
    }

});

app.get('/pizzas', function(req, res) {
  Pizza.find(function(err, pizzas) {
      // if there are any errors, return the error
      if (err)
          res.json({'error': true, 'msg':  err});

      res.json({pizzas: pizzas});
  });
});

app.post('/pizzas', function(req, res) {
  if (req.body.name) {
    Pizza.findOne({ 'name' :  req.body.name }, function(err, pizza) {
        // if there are any errors, return the error
        if (err) {
            res.json({'error': true, 'msg': err});
        }

        // if no user is found, return the message
        if (pizza) {
            res.json({'error': true, 'msg': 'Pizza already exists.'});
        } else {
          var piz = new Pizza();
          piz["name"] = req.body.name;
          if (req.body.description) {
            piz["description"] = req.body.description;
          }
          piz.save(function(err) {
              if (err)
                  res.json({'error': true, 'msg': err});

              res.json({"success": "pizza created"});
          })
        }
    });
  } else {
    res.json({'error': true, 'msg': 'no pizza created'});
  }
});

app.get('/pizzas/:id/toppings', function(req, res) {

});

app.post('/pizzas/:id/toppings', function(req, res) {

});

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
