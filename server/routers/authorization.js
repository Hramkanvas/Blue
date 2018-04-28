let router = require('express').Router();
let methods = require('../utils/QueryMethods');

router.post('/login',(req,res) =>{
    let user = methods.login(req.body.login,req.body.password);
    user ? res.status(200).send(user): res.status(404).send('Incorrect login or password!!!');
});

module.exports = router;