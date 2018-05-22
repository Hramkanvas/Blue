const router = require('express').Router();
const methods = require('../utils/QueryMethods');
const users = require('../utils/UsersUtils');

router.post('/login', (req, res) => {
    methods.login(req.body.login, req.body.password)
        .then((user) => {
            user ? res.status(200).send(user) : res.status(404).send('User not found')
        })
        .catch(err => res.status(404).send(err))
});

module.exports = router;