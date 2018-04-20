const express = require('express');
const db = require('./server/utils/MenuUtils');
const mongoose = require('mongoose');
let methods = require('./server/utils/QueryMethods');
const bodyParser = require("body-parser");

const app = express();
app.use('/static', express.static('public/components'));
app.use(bodyParser.json());

mongoose.connect(`mongodb://localhost:27017`);


app.post('/login',(req,res) =>{
    let user = methods.login(req.body.login,req.body.password);
    user ? res.send(user): res.send(404,"Incorrect login or password");
});

app.post('/downloadMenu', (req, res) => {
    db.addMenu()
        .then(answer => { 
            console.log(answer);
            res.send(answer) })
        .catch(err => console.log(err));
})

app.get('/getMenu', (req, res) => {
    db.findMenu(new Date(2018, 6, 20))
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
})

app.put('/upBalance',(req,res) =>{
    let user = methods.addBalance(req.body.id,req.body.sum);
    user ? res.send(user): res.send(404,'Invalid idw of user!!!');
})


app.listen(3000, () => {
    console.log(`Server is running...`);
})
