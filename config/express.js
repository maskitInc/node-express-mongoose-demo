'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const csrf = require('csurf');
const cors = require('cors');

const mongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const winston = require('winston');
const helpers = require('view-helpers');
const config = require('./');
const pkg = require('../package.json');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app) {

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  app.use(cors({
    origin: ['http://localhost:3000', 'https://velarm-landing-01.herokuapp.com'],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  }));

  // Static files middleware
  app.use(express.static(config.root + '/public'));

  // Use winston on production
  let log = 'dev';
  if (env !== 'development') {
    log = {
      stream: {
        write: message => winston.info(message)
    }
  };
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') app.use(morgan(log));

  // set views path, template engine and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'pug');

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  //app.use(upload.single('image'));
  app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // CookieParser should be above session
  app.use(cookieParser());
  app.use(cookieSession({secret: 'secret'}));
  app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: pkg.name,
    store: new mongoStore({
      url: config.db,
      collection: 'sessions'
    })
  }));


  /**
   *
   */

  app.use('/sw-toolbox', express.static( config.root + '/node_modules/sw-toolbox'));
  app.use('/jquery', express.static( config.root + '/node_modules/jquery'));
  app.use('/bootstrap', express.static( config.root + '/node_modules/bootstrap'));
  app.use('/font-awesome', express.static( config.root + '/node_modules/font-awesome'));
  //app.use('/vjs-youtube', express.static( config.root + '/node_modules/videojs-youtube/dist'));
  app.use('/vendor-js', express.static( config.root + '/node_modules'));

  app.use('/scripts', express.static( config.root + '/public/js/'));
  app.use('/images', express.static( config.root + '/public/img'));
  app.use('/files', express.static( config.root + '/public/files'));
  app.use('/video', express.static( config.root + '/public/video'));
  app.use('/audio', express.static( config.root + '/public/audio'));
  app.use('/css', express.static( config.root + '/public/css'));
  app.use('/', express.static( config.root ));

  /**
   *
   */

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

  // should be declared after session and flash
  app.use(helpers(pkg.name));


  if (env !== 'test') {
    app.use(csrf());

    // This could be moved to view-helpers :-)
    app.use(function (req, res, next) {

      res.locals.csrfToken = req.csrfToken();
      next();

      /*
       var token = req.csrfToken();
       res.cookie('XSRF-TOKEN', token);
       res.locals.csrfToken = token;
       next();
       */

    });
  }

  if (env === 'development') {
    app.locals.pretty = true;
  }
};
