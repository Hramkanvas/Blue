const router = require('express').Router();
const order = require('../utils/OrderUtils');
const methods = require('../utils/QueryMethods');
const users = require('../utils/UsersUtils');
const menu = require('../utils/MenuUtils')

router.put('/makeOrder',(req,res) => {//сделать заказ(обновить заказ)
    //структура объекта uploadOrder
    /*
     uploadOrder: {
        info: {
            dishName: {
                cost: Number,
                count: Number
            }
        },
    }*/
    order.uploadOrder(new Date(req.body.date), req.body.username, req.body.uploadOrder)
        .then(answer => {
            if(answer)
                return users.addOrderToHistory(req.body.username, new Date(req.body.date));
            else
                return;
        })
        .then(answer => {
            if(answer)
                res.send('Success!!!');
            else
                res.status(404);
        })
        .catch(err => res.status(404));
    //здесь надо сразу отнимать баланс у user'а
});

router.delete('/deleteOrder', (req, res) => {
    order.deleteOrder(new Date(req.body.date), req.body.username)
        .then(answer => {
            if(answer)
                return users.deleteOrderFromHistory(req.body.username, new Date(req.body.date));
            else
                return;
        })
        .then(answer => {
            if(answer)
                res.send('Success!!!');
            else
                res.status(404).send('Invalid data!!!');
        })
        .catch(err => res.status(404));
});

router.post('/getMainPage', (req,res) => {
    let username = req.body.username;
    let currentArr = users.getOrders(username,req.body.number)
        .then(array =>{
            return order.ordersForWeek(array, username);
        })
        .then(ans => {
            res.send(ans);
        })
        .catch(err => res.status(404));
    //еще надо выдать меню на неделю
});

module.exports = router;