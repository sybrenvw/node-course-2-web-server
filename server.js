const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const portNumber = 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  var serverLogFile = 'server.log';
  console.log(log);
  fs.appendFile(serverLogFile, log + '\n', (err) => {
    if (err) {
      console.log('unable to append to ${serverLogFile}')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to my website',
    name: 'Sybren',
    likes: [
      'Surfing',
      'Japan'
    ]
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error:404,
    errorMessage: 'De pagina kan niet worden getoond'
  });
});

app.listen(portNumber, () => {
  console.log(`Server running on port ${portNumber}`);
});
