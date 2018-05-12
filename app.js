const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use('', express.static('public'));
app.use(bodyParser.json());

mongoose.connect(`mongodb://localhost:27017`, function (err) {
    if (err)
        throw err;
    console.log('Successfully connected to database');
});

app.use('',require('./server/routers/user'));
app.use('/admin',require('./server/routers/admin'));
app.use('/authorization',require('./server/routers/authorization'));

app.listen(3000, () => {
    console.log(`Server is running...`);
});

