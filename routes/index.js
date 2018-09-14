const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');

router.get('/', (req, res)=>{
    res.write("home page");
    if(req.session.email){
        console.log(req.session.email);
        console.log(req.session.password);
    }
    res.end();
});

router.get('/login', (req, res)=>{
    res.render('login');
});

router.post('/login', (req, res)=>{
    req.session.email = req.body.email;
    req.session.password = req.body.password;
    res.redirect('/inbox');
    res.end();
});

router.get('/logout', (req, res)=>{
    if (!req.session.email){
        res.redirect('/login');
        res.end();
    }
    console.log('destroying session of ' + req.session.email);
    req.session.destroy((error)=>{
        if(error){
            console.log('Error when destorying session');
            console.log(error);
        }  
    });
    res.redirect('/login');
    res.end();
});

router.post('/signup', (req, res)=>{
    schemas.User.create({
        email: req.body.email,
        password: req.body.password
    }, (error)=>{
        if (error){
            console.log(error);
        }
    });
    res.redirect('/');
    res.end();
});

router.get('/inbox', (req, res)=>{
    schemas.Email.find({userTo: req.session.email}, (err, emails)=>{
        console.log(emails);
        res.render('inbox', {
            'email': req.session.email,
            'emails': emails
        });
    });
});

router.get('/compose', (req, res)=>{
    if(!req.session.email){
        res.redirect('/login');
        res.end();
    }
    else {
        res.render('compose', {
        'email': req.session.email
        });
    }   
});

router.post('/send', (req, res)=>{
    schemas.Email.create({
        userTo: req.body.userTo,
        userFrom: req.session.email,
        subject: req.body.subject,
        contents: req.body.contents
    }, (error)=>{
        if (error){
            console.log(error);
        }
    });
    res.redirect('/inbox');
    res.end();
});

module.exports = router;

// richard.chester93@gmail.com