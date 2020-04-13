require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');


mongoose
  .connect('mongodb://localhost/file-upload-example-server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// ADD CORS HERE:
// allow access to the API from diffetent domains/origins
app.use(cors({
  // this could be multiple domains/origins, but we will allow just our React app
  origin: [ "http://localhost:3000" ]
}));


// include your new routes here:
app.use('/api', require('./routes/file-upload-routes'));
app.use('/api', require('./routes/thing-routes'));


module.exports = app;
