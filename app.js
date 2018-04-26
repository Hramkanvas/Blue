const express = require('express');
const menu = require('./server/utils/MenuUtils');
const order = require('./server/utils/OrderUtils');
const mongoose = require('mongoose');
let methods = require('./server/utils/QueryMethods');
const bodyParser = require('body-parser');

const app = express();
app.use('/static', express.static('public'));
app.use(bodyParser.json());

mongoose.connect(`mongodb://localhost:27017`, function(err) {
    if (err)
        throw err;
    console.log('Successfully connected to database');
});
app.post('/login',(req,res) =>{
    let user = methods.login(req.body.login,req.body.password);
    user ? res.status(200).send(user): res.status(404).send('Incorrect login or password!!!');
});

app.post('/downloadMenu', (req, res) => {
    menu.addMenu()
        .then(answer => { 
            console.log(answer);
            res.send(answer) })
        .catch(err => console.log(err));
});

app.get('/getMenu', (req, res) => {
    menu.findMenu(new Date(2018, 6, 20))
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

app.put('/upBalance',(req,res) =>{
    let user = methods.addBalance(req.body.id,req.body.sum);
    user ? res.status(200).send(user): res.status(404).send('Invalid id of user!!!');
});

app.post('/getTotalBalance', (req,res) => {
    let totalBalance = 23.4;
   res.status(200).send({totalBalance});

});

app.put('/makeOrder',(req,res) => {//сделать заказ(обновить заказ)
    //структура объекта uploadOrder
    /*
     uploadOrder: {
        price:Number,
            info: {
            dishName: {
                cost: Number,
                count: Number
            }
        }
    }*/
    order.uploadOrder(new Date(req.body.date), req.body.username, req.body.uploadOrder)
        .then(answer => res.status(200).send(answer))
        .catch(err => res.status(404));
});


app.delete('/deleteOrder', (req,res) => {
   order. deleteOrder(new Date(req.body.date), req.body.username)
        .then(answer => res.status(200).send(answer))
        .catch(err => res.status(404));
});


app.listen(3000, () => {
    console.log(`Server is running...`);
});
