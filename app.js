const express = require('express');
const db = require('./server/utils/MenuUtils');
const mongoose = require('mongoose');


const app = express();


mongoose.connect(`mongodb://localhost:27017`);

app.put('/', (req, res) => {
    db.addMenu()
        .then(response => { 
            console.log(response);
            res.send(response.body) })
        .catch(err => console.log(err));

})

app.get('/', (req, res) => {
    db.findMenu(new Date(2018, 3, 26))
        .then(response => res.send(response.body))
        .catch(err => console.log(err));
})

app.listen(3000, () => {
    console.log(`Server woyy `);
})