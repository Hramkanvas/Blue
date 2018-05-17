const mongoose = require('mongoose');
const moment = require('moment');
const Users = require('../models/Users');
const weekMillisec = 1000 * 60 * 60 * 24 * 7;

module.exports = {
    upBalance,
    withdrawFromBalance,
    addUser,
    addOrderToHistory,
    deleteOrderFromHistory,
    getBalance,
    getOrders,
    getFIO,
    getUsers,
    getUser
}

function addOrderToHistory(username, receved_date) {
    return swapWeekAtDB(username)
        .then((user) => {
            if (!user) {
                return false;
            }
            let date = new Date(receved_date);
            date.setHours(3, 0, 0, 0);
            switch (getWeekKey(date, user.history.previousMonday)) {
                case 1:
                    if (user.history.current.indexOf(date.toString()) != -1)
                        return true;

                    user.history.current.push(date);
                    user.history.current.sort((a, b) => b - a);
                    break;
                case 2:
                    if (user.history.next.indexOf(date.toString()) != -1)
                        return true;
                    user.history.next.push(date);
                    user.history.next.sort((a, b) => b - a);
                    break;
                default:
                    return false;
            }

            return user.save();
        });
};


function deleteOrderFromHistory(username, receved_date) {
    return swapWeekAtDB(username)
        .then((user) => {
            if (!user) {
                return false;
            }
            let date = new Date(receved_date);
            /* if (moment(date).set({'h': 10, 'm': 0, 's': 0, 'ms': 0}).isBefore(moment())) {
                 return false;
             }*/

            date.setHours(3, 0, 0, 0);
            switch (getWeekKey(date, user.history.previousMonday)) {
                case 1:
                    let i = user.history.current.indexOf(date.toString());
                    if (i != -1)
                        user.history.current.splice(i, 1);
                    else
                        return false;
                    break;
                case 2:
                    let ind = user.history.next.indexOf(date.toString());
                    if (ind != -1)
                        user.history.next.splice(ind, 1);
                    else
                        return false;
                    break;
                default:
                    return false;
            }

            return user.save();
        });
};

function getOrders(username, key = 1) {//ключ: 0 - предыдущая неделя, 1 - текущая, 2 - следующая. Default - 1
    return swapWeekAtDB(username)
        .then((user) => {
            if (!user) {
                return false;
            }
            console.log(key);
            switch (key) {
                case 0:
                    return user.history.previous;
                case 1:
                    return user.history.current;
                case 2:
                    return user.history.next;
                default:
                    return false;
            }
        });
};

function getUsers() {
    return Users.find({}, {username: 1, FIO: 1, balance: 1});
};

function getUser(username) {
    return Users.findOne({username});
}

function getFIO(username) {
    return Users.findOne({username})
        .then((user) => {
            return (user ? user.FIO : false);
        });
};

function getBalance(username) {
    return Users.findOne({username})
        .then((user) => {
            return user.balance;
        });
};

function swapWeekAtDB(username) {

    let prMonday = new Date(moment().day(-6));
    prMonday.setHours(3, 0, 0, 0);

    return Users.findOne({username})
        .then((user) => {
            if (!user) {
                return false;
            }
            //console.log(getWeekKey(prMonday, user.history.previousMonday));
            switch (getWeekKey(prMonday, user.history.previousMonday)) {
                case 0:
                    return user;
                case 1:
                    user.history.previousMonday = prMonday;
                    user.history.previous = user.history.current;
                    user.history.current = user.history.next;
                    user.history.next = [];
                    break;
                case 2:
                    user.history.previousMonday = prMonday;
                    user.history.previous = user.history.next;
                    user.history.current = [];
                    user.history.next = [];
                    break;
                default:
                    user.history.previous = [];
                    user.history.current = [];
                    user.history.next = [];
            }

            return user.save();

        });
};

function getWeekKey(date, prMonday) {
    return ((date - prMonday > 0) ? Math.floor((date - prMonday) / (weekMillisec)) : Math.ceil((date - prMonday) / (weekMillisec)));
};


function upBalance(username, amount) {
    return Users.findOne({username})
        .then((user) => {
            if (user && typeof (amount) == "number" && amount > 0) {
                user.balance += +amount;
                return user.save();
            }
            else
                return false;
        });
};

function withdrawFromBalance(username, amount) {
    return Users.findOne({username})
        .then((user) => {
            if (user && typeof (amount) == "number" && amount > 0) {
                user.balance -= +amount;
                return user.save();
            }
            else
                return false;
        });
};

function addUser(username, FIO) {
    let prMonday = new Date(moment().day(-6));
    prMonday.setHours(3, 0, 0, 0);
    var newUser = new Users({
        username,
        FIO,
        balance: 0,
        history: {
            previousMonday: prMonday,
            previous: new Array(),
            current: new Array(),
            next: new Array()
        }
    });

    return newUser.save().then(() => newUser);
};
