// Imports
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Car = require('./models/carScheme');
const methodOverride = require("method-override");

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// DATABASE
require('./config/database.js');

// RESTFUL ROUTING

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs');
});

app.post('/cars', async (req, res) => {
    await Car.create(req.body);
    res.redirect('/cars');
});

app.get('/cars', async (req, res) => {
    const cars = await Car.find();
    res.render('cars/index.ejs', { 
        cars });
});

app.get('/cars/:carId', async (req, res) => {
    const car = await Car.findById(req.params.carId);
    res.render('cars/show.ejs', { 
        car });
});

app.delete('/cars/:carId' , async (req, res) =>{
   await Car.findByIdAndDelete(req.params.carId)
   res.redirect('/cars')
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});
