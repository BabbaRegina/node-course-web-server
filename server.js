const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //default è 3000
var app = express(); //non servono argomenti

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// log nel middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append log file.');
        }
    });
    next();
});


app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'This is the welcome message!!!! Hello there, welcome!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfil request'
    });
});


// bind app to port
app.listen(port, () => {
    console.log('Server up on port ' + port);
});