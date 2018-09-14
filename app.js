const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const port = 4000;

mongoose.connect('mongodb://localhost:27017/emails', (error)=>{
    if (error){
        console.log('Failed to connect to database');
        console.log(error);
    }
    else{
        console.log('Connected to database');
    }
});

app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession({secret: "theSuperSecret"}));
app.use(routes);

app.listen(port, ()=>{
    console.log('Listening for requests on ' + port);
});