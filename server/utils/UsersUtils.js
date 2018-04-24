const mongoose = require('mongoose');
const Users = require('../models/Users');
const Menu = require('../models/Menu');


module.exports = {
    upBalance,
    addUser,
    addOrderToHistory
}

//new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay() + 1 + 7)

function addOrderToHistory(username, date) {

    return Users.findOne({username})
        .then((user) => {
            let currentDate = new Date();
            let previousMonday = new Date(currentDate.getFullYear(),
                currentDate.getMonth(),
                currentDate.getDate() - currentDate.getDay() - 6);
            console.log(Math.floor((date - previousMonday) / (1000 * 60 * 60 * 24 * 7)));
            switch (Math.floor((date - previousMonday) / (1000 * 60 * 60 * 24 * 7))) {
                case 0:
                    user.history.previous.push(date);
                    break;
                case 1:
                    user.history.current.push(date);
                    break;
                case 2:
                    user.history.next.push(date);
                    break;
                default:
                    return false;
            }

            return user.save(function (err) {
                if (err) return err;
                return true;
            });
        })
        .catch(err => {
            return err;
        });
};

function upBalance(username, amount) {

    return Users.findOne({username})
        .then((user) => {
            user.balance += amount;

            return user.save(function (err) {
                if (err) return err;

                return true;
            });
        })
        .catch(err => {
            return err;
        });
};


function addUser(username, FIO) {
    var newUser = new Users({
        username,
        FIO,
        balance: 0,
        history: {
            previous: new Array(),
            current: new Array(),
            next: new Array()
        }
    });

    newUser.save(function (err) {
        if (err) throw err;

        console.log('Book successfully saved.');
    });
};
