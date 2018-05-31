import express from 'express';

const app = express();

// =======================
// engine ==============
// =======================
import path from 'path';
import exphbs from 'express-handlebars';
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import config from './config';
import router from "./router/index";

const port = process.env.PORT || 8080;
mongoose.connect(config.database, (err) => {
  if (err) {
    console.log('Error initializing connection to MongoDB');
    return;
  } else {
    console.log('Connect to mongoDB successfully');
  }
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// express-session
import session from 'express-session';
app.use(session({
  secret: 'secret',
  saveUninitialized: 'true',
  resave: true,
}));

// =======================
// passport ==============
// =======================
import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;
app.use(passport.initialize());
app.use(passport.session());


// =======================
// routes ================
// =======================

// Declaration connect to router
app.use('/', router);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);