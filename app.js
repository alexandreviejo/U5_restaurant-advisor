const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

const routes = require('./routes/index');
const helpers = require('./helpers');

// create our Express app
const app = express();

// serves up static files from the public folder. Anything in public/ will just be 
// served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// VIEWS: this is the folder where we keep our pug files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); // we use the engine pug

//Express body-parser implementation -> access to req.body
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// populates req.cookies with any cookies that came along with the request
//app.use(cookieParser());

// use of express-session -> HTTP is stateless
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,  //name of the cookie
    resave: false,
    saveUninitialized: false,
    //the session is stored in the DB
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));


// The flash middleware let's us use req.flash('error', 'Shit!'), 
// which will then pass that message to the next page the user requests
app.use(flash());


//MIDDLEWARE: there is a pipeline between the req and the res, this is a step in between
app.use((req, res, next) => {
  //res.locals -> response local variables scoped to the request

  res.locals.h = helpers;
  
  //aqui ponemos los flashes del REQ para que este disponibles en el LOCALS del RES
  //requiere uso de sesiones para la consistencia entre el REQ del ciclo anterior y el nuevo
  res.locals.flashes = req.flash();
  
  res.locals.currentPath = req.path;

  next();  //Go to the next middleware in the REQ-RES CYCLE
});


//ROUTER: anytime someone goes to "/anything", we will handle it with the module "routes"
app.use('/', routes);


module.exports = app;
