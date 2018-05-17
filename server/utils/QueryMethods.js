const fs = require('fs');
const users = JSON.parse(fs.readFileSync('./server/files/users.json'));
const Users = require('../models/Users');
const mongoose = require('mongoose');
const us = require('../utils/UsersUtils');

const methods = (function () {

    let login = function (login, password) {
        let user = users.find((user) => user.login === login && user.password === password);
        if (user) {
            if (user.type === 'user') {
                us.getUser(user.username)
                    .then((ans) => {
                        if (!ans) {
                            return us.addUser(user.username, user.FIO)
                        }
                        else
                            return ans;
                    });

            }
            else
                return new Promise((res, rej) => {
                    res(user);
                });

        }
        else
            return new Promise((res, rej) => {
                res(false);
            });

    };


    return {
        login
    }

})();
module.exports = methods;

