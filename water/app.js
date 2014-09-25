var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
 var routes = require('./routes/index');
 var users = require('./routes/users');

var app = express();

// view engine setup
 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'hjs');

app.get('/', function (req, res) {
  res.render('index', {});
});

app.post('/send', function(req,res){


  // Create a SMTP transport object
  var transport = nodemailer.createTransport("SMTP", {
          service: 'Gmail',
          auth: {
              user: 'awesomeemailsystem@gmail.com',
              pass: 'Eassword1234'
          }
      });

  console.log('SMTP Configured');

  // Message object
  var message = {

      // sender info
      from: 'Sender Name <awesomeemailsystem@gmail.com>',

      // Comma separated list of recipients
      to: '"Receiver Name" <philsankey92@gmail.com>',

      // Subject of the message
      subject: 'Nodemailer is unicode friendly ✔',

      // plaintext body
      text: 'Hello to myself!',

      // HTML body
      html:'<p> hi </p>'+
           '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'
  };
  console.log('Sending Mail');
  transport.sendMail(message, function(error){
      if(error){
          console.log('Error occured');
          console.log(error.message);
          // res.redirect("/");
          return;
      }
      console.log('Message sent successfully!');
    //  res.redirect("/");
      // if you don't want to use this transport object anymore, uncomment following line
      //transport.close(); // close the connection pool
      //res.end("hi");
  });

});
// app.use(favicon());
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(cookieParser());
 app.use(require('less-middleware')(path.join(__dirname, 'public')));
 app.use(express.static(path.join(__dirname, 'public')));
//
 app.use('/', routes);
 app.use('/users', users);
//
// /// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
