const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const contactRoute = require('./api/routes/contactRoute');
const userRoute = require('./api/routes/userRoute');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contacts');
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/contacts', contactRoute);
app.use('/api/users', userRoute)

app.get('/', (req, res, next) => {
    res.send('<h1>This is our Home</h1>')
})

// Port
const PORT = process.env.PORT | 1000;
app.listen(PORT, () => {
    console.log(`Listening on the port ${PORT}`);
})