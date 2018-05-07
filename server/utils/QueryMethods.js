const fs = require('fs');
const users = JSON.parse(fs.readFileSync('./server/files/users.json'));
const Users = require('../models/Users');
const mongoose = require('mongoose');

const methods = (function () {

    let login = function(login, password) {
        let user = users.find((user) => user.login === login && user.password === password);
        if(user) {
            return Users.findOne({username: user.username})
                .then((user) => {
                    if (user)
                        return user;
                    return false;
                });
        }
        else
            return new Promise((res, rej) => {
                res(false);
            })

    };


    return {
        login
    }

})();
module.exports = methods;

