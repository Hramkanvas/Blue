let router = require('express').Router();
const order = require('../utils/OrderUtils');
let methods = require('../utils/QueryMethods');
let users = require('../utils/UsersUtils');


router.put('/makeOrder',(req,res) => {//сделать заказ(обновить заказ)
    //структура объекта uploadOrder
    /*
     uploadOrder: {
            price:Number,
            info: {
                dishName: {
                    cost: Number,
                    count: Number
                }
            },
        isAvailable: true  //доступен ли заказ для изменения
    }*/
    Promise.all([ order.uploadOrder(new Date(req.body.date), req.body.username, req.body.uploadOrder),
                  users.addOrderToHistory(req.body.username, new Date(req.body.date))])
        .then(answers =>{
            if(answers[0] && answers[1])
                res.status(200).send('Success!!!')

            res.status(400).send('Invalid data!!!')
        })
        .catch(err => res.status(404));
    //поле price надо не писать самому, а считать и записывать в методе uploadOrder
    //здесь надо сразу отнимать баланс у user'а
});

router.delete('/deleteOrder', (req, res) => {

    Promise.all([order.deleteOrder(new Date(req.body.date), req.body.username),
                users.deleteOrderFromHistory(req.body.username, new Date(req.body.date))])
        .then(answers => {
            if(answers[0] && answers[1])
                res.status(200).send('Success!!!');

            res.status(400).send('Invalid data!!!');
        })
        .catch(err => res.status(404));
});

router.post('/getMainPage', (req,res) => {
    let username = req.body.username;
    let date = new Date();
    let previousArr = users.getOrders(username,0);
    let currentArr = users.getOrders(username,1);
    let nextArr = users.getOrders(username,2);
    let prom = [];

    Promise.all([previousArr,currentArr,nextArr])
        .then((arrays) =>{
            console.log(arrays);
            arrays.forEach((item)=>{
                prom.push(order.ordersForWeek(item, username));
            });
            Promise.all(prom)
                .then((ans) => res.status(200).send(ans));
        });
    //еще надо добавить все три менюшки,но для этого надо переделать метод findMenu
});


module.exports = router;