const router = require('express').Router();
const menu = require('../utils/MenuUtils');
const users = require('../utils/UsersUtils');
const orders = require('../utils/OrderUtils');
const moment = require('moment');

router.get('/getMenu', (req, res) => {
    menu.findMenu(req.query.number)
        .then(answer => {
            if (answer)
                res.send(answer);
            else
                throw new Error('Menu not found');
        })
        .catch(err => res.status(404).send(err.message));
});

router.put('/upBalance', (req, res) => {
    users.upBalance(req.body.username, req.body.amount)
        .then((user) => user ? res.status(200).send(user) : res.status(404).send('Invalid username'));
});

router.get('/getUsers', (req, res) => {
    users.getUsers()
        .then(answer => res.send(answer))
        .catch(err => res.status(404).send(err));
});

router.get('/getDayOrders', (req, res) => {
    let date = req.query.date || moment();
    let prom = [];
    let p;
    orders.getDayOrders(date)
        .then(dayOrders => {
            let {Orders} = dayOrders;
            for (let user in Orders) {
                p = users.getFIO(user)
                    .then(ans => {
                        Orders[user].FIO = ans;
                    });
                prom.push(p);
            }
            Promise.all(prom)
                .then(ans => {
                    res.send(Orders);
                });

        })
        .catch(err => res.status(404).send(err));
});

router.get('/getDayOrdersStatistic', (req, res) => {
    let date = req.query.date || moment();
    orders.getTotal(date)
        .then(answer => res.send(answer))
        .catch(err => res.status(404).send(err));
});

router.get('/isMakingOrder', (req, res) => {
    orders.isDayOrdersBlocked()
        .then(answer => {
            if (answer === true || answer === false) {
                res.send(!answer)
            }
            res.status(404).send();
        })
        .catch(err => res.status(404).send(err));
});

router.get('/getDayOrdersStatistic',(req,res)=>{//для итогового заказа
    let date = req.query.date || new Date;

    orders.getTotal(date)
        .then(answer => res.send(answer))
        .catch(err => res.send(err.message));
});

router.post('/uploadMenu', (req, res) => {
    const buffer = [];
    req.on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', () => {
        const file = Buffer.concat(buffer);
        menu.addMenu(file)
            .then(answer => {;
                res.send(JSON.stringify('Меню загружено'))
            })
            .catch(err => res.status(404).send(err.message));
    });

});

router.get('/confirmDayOrders', (req, res) => {
    //нужно вызвать запрос  'getDayOrdersStatistic' перед этим,чтобы посчитать кол-во продуктов
    let date = moment();
    let prom = [];
    orders.createDayOrdersSchema(date)
        .then(() => orders.confirmDayOrders(date))
        .then(() => orders.getDayOrders(date))
        .then((userOrders) => {
            let {Orders} = userOrders;
            for (let user in Orders) {
                prom.push(users.withdrawFromBalance(user, Orders[user].price));
            }

            return Promise.all(prom);
        })
        .then(() => res.send('Success'))
        .catch((error) => res.status(404).send(error.message));


});

module.exports = router;