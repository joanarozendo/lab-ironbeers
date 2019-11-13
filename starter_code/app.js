
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beersObject => {
    res.render('beers', {
      beers: beersObject
    });
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    res.render('random-beer', {
      beer: randomBeer
    });
  })
  .catch(error => {
    console.log(error)
  })
});

/* app.get('/random-beer/:random-beer_id', (req, res, next) => {
  punkAPI.getBeer()
  .then(randomBeer => {
    res.send(req.params.random-beer_id);
    res.render('random-beer', {
      beer: randomBeer
    });
  })
  .catch(error => {
    console.log(error)
  })
}); */

app.listen(3000);
