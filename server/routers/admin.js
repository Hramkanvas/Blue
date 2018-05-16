const router = require('express').Router();
const menu = require('../utils/MenuUtils');
const users = require('../utils/UsersUtils');
const orders = require('../utils/OrderUtils');
const moment = require('moment');

router.get('/getMenu', (req, res) => {
    //переделать на 0 , 1 , 2
    menu.findMenu(req.query.number)
        .then(answer => {
            if (answer)
                res.send(answer)
            else
                res.status(404).send('Menu not found');
        })
        .catch(err => res.status(404).send('Menu not found'));
});

router.put('/upBalance', (req, res) => {
    users.upBalance(req.body.username, req.body.amount)
        .then((user) => user ? res.status(200).send(user) : res.status(404).send('Invalid username!!!'));
});

router.get('/getUsers', (req, res) => {
    users.getUsers()
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

router.get('/getDayOrders', (req, res) => {//для таблицы
    let date = req.query.date || new Date;
    let prom = [];
    let p;
    orders.getDayOrders(date)
        .then(dayOrders => {
            for (let user in dayOrders) {
                p = users.getFIO(user)
                    .then(ans => {
                        dayOrders[user].FIO = ans;
                    });
                prom.push(p);
            }
            console.log(dayOrders);
            Promise.all(prom)
                .then(ans => {
                    res.send(dayOrders);
                });

        })
        .catch(err => console.log(err));
});

router.get('/getDayOrdersStatistic', (req, res) => {//для итогового заказа
    let date = req.query.date || new Date;
    orders.getTotal(date)
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

router.get('/isMakingOrder', (req, res) => {
    orders.getDayOrders()
        .then(answer => {
            if (answer === true || answer === false) {
                res.send(!answer)
            } else res.status(400).send();
        })
        .catch(err => console.log(err));
});

router.get('/getDayOrdersStatistic',(req,res)=>{//для итогового заказа
    let date = req.query.date || new Date;

    orders.getTotal(date)
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

router.post('/uploadMenu', (req, res) => {
    const buffer = [];

    req.on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', () => {
        console.log(buffer);
        const file = Buffer.concat(buffer);
        console.log(file);
        menu.addMenu(file)
            .then(answer => {
                res.send(answer)
            })
            .catch(err => console.log(err));
    });

});

//посчитать итого за день
//списать с баланса price у каждого пользователя
//isBlock = true
router.get('/confirmDayOrders', (req, res) => {
    //нужно вызвать запрос  'getDayOrdersStatistic' перед этим,чтобы посчитать кол-во продуктов
    let date = moment();
    let prom = [];
    orders.createDayOrdersSchema(date)
        .then((ans) => {
            if (ans)
                return orders.confirmDayOrders(date)
            else
                return Promise.reject(new Error('На эту дату подтвержден заказ'));
        })
        .then(() => orders.getDayOrders(date))
        .then((userOrders) => {
            for (let user in userOrders) {
                prom.push(users.withdrawFromBalance(user, userOrders[user].price));
            }

            return Promise.all(prom);
        })
        .then(() => res.send('Success'))
        .catch((error) => res.status(404).send(error.message));


});

module.exports = router;