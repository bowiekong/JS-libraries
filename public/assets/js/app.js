const express = require('express');
const ExpressError = require("../../../exception/ExpressError");
const path = require("path");
const app = express();
const ejsMate = require('ejs-mate');
const countdown = require('countdown')

app.listen(3000)

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../../../public')));

app.get('/', function (req, res) {
    res.redirect('/home')
});
app.get('/home', function (req, res) {
    res.render('home/index')
});

app.get('/menu', function (req, res) {
    res.render('menu/index')
});

app.get('/recommend', function (req, res) {
    res.render('recommendation/index')
});

app.get('/order', function (req, res) {

    const timestamp = countdown(new Date(2023, 12, 31), new Date()).toString();

    console.log(timestamp)

    res.render('order/index', {timestamp})
});

app.get('/map', function (req, res) {
    res.render('map/index')
});

app.all('*', (req, res, next) => {

    next(new ExpressError(404, 'Page Not Found'));
});


app.use((err, req, res, next) => {
    const {
        statusCode = 500,
        message = 'Unexpected error',
    } = err;

    res.status(statusCode);
    res.render(
        'error/error',
        {
            err,
        });
});


