let router = require('express').Router();
const menu = require('../utils/MenuUtils');
let methods = require('../utils/QueryMethods');

router.get('/getMenu', (req, res) => {

    console.log('getMenu');

    menu.findMenu(new Date(2017, 6, 20))
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

router.put('/upBalance',(req,res) => {
    let user = methods.addBalance(req.body.id, req.body.sum);
    user ? res.status(200).send(user) : res.status(404).send('Invalid id of user!!!');
});

router.post('/downloadMenu', (req, res) => {
    menu.addMenu()
        .then(answer => {
            console.log(answer);
            res.send(answer)
        })
        .catch(err => console.log(err));
});

module.exports = router;