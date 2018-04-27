const mongoose = require('mongoose');
const Users = require('../models/Users');
const weekMillisec = 1000 * 60 * 60 * 24 * 7;

module.exports = {
    upBalance,
    addUser,
    addOrderToHistory,
    deleteOrderFromHistory,
    getBalance,
    getOrders,
    getFIO
}

function addOrderToHistory(username, date) {

    return Users.findOne({username})
        .then((user) => {

            swapWeekAtDB(username)

            let currentDate = new Date();

            let deadline = new Date(date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                10);

            if (currentDate > deadline) {
                return false;
            }

            date.setHours(0, 0, 0, 0);
            switch (Math.floor((date - user.history.previousMonday) / (weekMillisec))) {
                case 1:
                    if (user.history.current.indexOf(date.toString()) != -1)
                        return false;

                    user.history.current.push(date);
                    user.history.current.sort(function (a, b) {
                        return b - a;
                    });
                    break;
                case 2:
                    if (user.history.next.indexOf(date.toString()) != -1)
                        return false;
                    user.history.next.push(date);
                    user.history.next.sort(function (a, b) {
                        return b - a;
                    });
                    break;
                default:
                    return false;
            }

            return user.save(function (err) {
                if (err) return err;
                return true;
            });
        })
};

function deleteOrderFromHistory(username, date) {

    return Users.findOne({username})
        .then((user) => {

            swapWeekAtDB(username);

            let currentDate = new Date();

            let deadline = new Date(date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                10);

            if (currentDate > deadline) {
                return false;
            }

            date.setHours(0, 0, 0, 0);
            switch (Math.floor((date - user.history.previousMonday) / (weekMillisec))) {
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

            return user.save(function (err) {
                if (err) return err;
                return true;
            });
        })
};

function getOrders(username, date) {

    return Users.findOne({username})
        .then((user) => {

            switch (Math.floor((date - user.history.previousMonday) / (weekMillisec))) {
                case 0:
                    return user.history.previous;
                    break;
                case 1:
                    return user.history.current;
                    break;
                case 2:
                    return user.history.next;
                    break;
                default:
                    return false;
            }
        })
};

function getFIO(username) {

    return Users.findOne({username})
        .then((user) => {
            return user.FIO.toString();
        })
};

function getBalance(username) {
    return Users.findOne({username})
        .then((user) => {
            return user.balance;
        })
};

function swapWeekAtDB(username) {
    let currentDate = new Date();

    let prMonday = new Date(currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - 6);

    Users.findOne({username})
        .then((user) => {

            switch (Math.floor((prMonday - user.history.previousMonday) / (weekMillisec))) {
                case 0:
                    return true;
                    break;
                case 1:
                    user.history.previousMonday = prMonday;
                    user.history.previous = user.history.current;
                    user.history.current = user.history.next;
                    user.history.next = new Array();
                    break;
                case 2:
                    user.history.previousMonday = prMonday;
                    user.history.previous = user.history.next;
                    user.history.current = new Array();
                    user.history.next = new Array();
                    break;
                default:
                    user.history.previous = new Array();
                    user.history.current = new Array();
                    user.history.next = new Array();
            }

            return user.save(function (err) {
                if (err) return err;
                return true;
            });
        })
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
};

function addUser(username, FIO) {
    let currentDate = new Date();

    let prMonday = new Date(currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - 6);
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

    newUser.save(function (err) {
        if (err) throw err;
    });
};
