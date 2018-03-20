const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

// post request libs
const bodyParser = require('body-parser');
const methodOverride = require('method-override')


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


// post request use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {

    // get my json from the file
  jsonfile.readFile(FILE, (err, obj) => {

    // obj is the pokedex json file

    // deal with the request
    let name = request.params.id;

    let pokemon = null;

    for( let i=0; i<obj.pokemon.length; i++ ){
      if( obj.pokemon[i].id == request.params.id ){
        pokemon = obj.pokemon[i];
      }
    }

    if( pokemon === null ){

      response.render('404');
    }else{
      let context = {
        pokemon : pokemon
      };

      // send something back
      response.render('pokemon', context);

    }
  });
});

app.get('/new', (req, res) => {
  // send response with some data (a HTML file)
  res.render('new');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
