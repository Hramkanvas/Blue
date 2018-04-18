const express = require('express');
const db = require('./server/utils/MenuUtils');
const mongoose = require('mongoose');


const app = express();


mongoose.connect(`mongodb://localhost:27017`);

app.put('/', (req, res) => {
    db.addMenu()
        .then(answer => { 
            console.log(answer);
            res.send(answer) })
        .catch(err => console.log(err));

})

app.get('/', (req, res) => {
    db.findMenu(new Date(2018, 8, 25))
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
})

app.listen(3000, () => {
    console.log(`Server woyy `);
})