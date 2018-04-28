const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use('/static', express.static('public'));
app.use(bodyParser.json());

mongoose.connect(`mongodb://localhost:27017`, function (err) {
    if (err)
        throw err;
    console.log('Successfully connected to database');
});

let adminRouter = require('./server/routers/admin');
let userRouter = require('./server/routers/user');
let authorizationRouter = require('./server/routers/authorization');

app.use('/',userRouter);
app.use('/admin',adminRouter);
app.use('/authorization',authorizationRouter);

app.listen(3000, () => {
    console.log(`Server is running...`);
});

