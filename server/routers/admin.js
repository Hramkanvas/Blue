let router = require('express').Router();
const menu = require('../utils/MenuUtils');
let methods = require('../utils/QueryMethods');

router.get('/getMenu', (req, res) => {
    menu.findMenu(new Date(2018, 6, 20))
        .then(answer => res.send(answer))
        .catch(err => console.log(err));
});

router.put('/upBalance', (req, res) => {
    let user = methods.addBalance(req.body.id, req.body.sum);
    user ? res.status(200).send(user) : res.status(404).send('Invalid id of user!!!');
});

router.post('/downloadMenu', (req, res) => {
    const buffer = [];
    req.on('data', (chunk) => {
        buffer.push(chunk);
    }).on('end', () => {
        const file = Buffer.concat(buffer);
        console.log(file);
        menu.addMenu(file)
            .then(answer => {
                console.log(answer);
                res.send(answer)
            })
            .catch(err => console.log(err));
    });

});

module.exports = router;