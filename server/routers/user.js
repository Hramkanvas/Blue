let router = require('express').Router();
const order = require('../utils/OrderUtils');
let methods = require('../utils/QueryMethods');

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
        }
    }*/
    order.uploadOrder(new Date(req.body.date), req.body.username, req.body.uploadOrder)
        .then(answer => res.status(200).send(answer))
        .catch(err => res.status(404));
});

router.get('/getTotal', (req,res) => {
    res.status(200).send(
        {
            'username': 'dima',
            'balance': 10,
            'total': methods.getTotalBalance(),
            'orders': []
        });
});

router.delete('/deleteOrder', (req, res) => {
    order.deleteOrder(new Date(req.body.date), req.body.username)
        .then(answer => res.status(200).send(answer))
        .catch(err => res.status(404));
});

module.exports = router;