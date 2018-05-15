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

router.get('/getTotalPriceForWeek', (req,res) => {
    let username = req.query.username;
    users.getOrders(username)
        .then(array =>{
            return order.ordersForWeek(array, username);
        })
        .then(orders => {
            let total = {totalPriceForWeek: 0};
            orders.forEach(function (order) {
                total.totalPriceForWeek += order.price;
            });
            res.send(total);
        })
        .catch(err => res.status(err));
});

router.post('/getMainPage', (req,res) => {
    let currentOrders;
    let username = req.body.username;
    let number = +req.body.number;
    let currentArr = users.getOrders(username,number)
        .then(array =>{
            if(array)
                return order.ordersForWeek(array, username);
            res.status(404).send('User not found');
        })
        .then(ans => {
            currentOrders = ans;
            return menu.findMenu(number);
        })
        .then(ans => {
            let answer = [];
            if(ans)
            {
                answer.push(currentOrders);
                answer.push(ans);
                res.send(answer);
            }
            res.status(404).send('Menu not found');;
        })
        .catch(err => res.status(404));

});

module.exports = router;