const mongoose = require('mongoose');
const Users = require('../models/Users');


module.exports = {
    upBalance,
    addUser,
    addOrderToHistory,
    deleteOrderFromHistory
}

//new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay() + 1 + 7)

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

            switch (Math.floor((date - user.history.previousMonday) / (1000 * 60 * 60 * 24 * 7))) {
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
        .catch(err => {
            return err;
        });
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

            switch (Math.floor((date - user.history.previousMonday) / (1000 * 60 * 60 * 24 * 7))) {
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
        .catch(err => {
            return err;
        });
};

function swapWeekAtDB(username) {
    let currentDate = new Date();

    currentDate = new Date(currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() + 10);

    let prMonday = new Date(currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay() - 6);

    Users.findOne({username})
        .then((user) => {

            console.log(user);
            console.log(Math.floor((prMonday - user.history.previousMonday) / (1000 * 60 * 60 * 24 * 7)));
            switch (Math.floor((prMonday - user.history.previousMonday) / (1000 * 60 * 60 * 24 * 7))) {
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
