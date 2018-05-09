const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { Client } = require('pg');

// Initialise postgres client
const client = new Client({
  user: 'akira',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', (req, res) => {
  // query database for all pokemon

  // respond with HTML page displaying all pokemon
});

app.get('/new', (request, response) => {
  // respond with HTML page with form to create new pokemon
  response.render('New');
});


app.post('/pokemons', (req, response) => {
  let params = req.body;

  const queryString = 'INSERT INTO pokemons(name, height) VALUES($1, $2)'
  const values = [params.name, params.height];

  client.connect((err) => {
    if (err) console.error('connection error:', err.stack);

    client.query(queryString, values, (err, res) => {
      if (err) {
        console.error('query error:', err.stack);
      } else {
        console.log('query result:', res);

        // redirect to home page
        response.redirect('/');
      }
      client.end();
    });
  });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
