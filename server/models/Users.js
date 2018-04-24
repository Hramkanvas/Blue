const mongoose  = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String},
    FIO: {type: String},
    balance: {type: Number}, // пополнение/списывание баланса,
    history: {
        previous: {type: Array},
        current: {type: Array},
        next: {type: Array}
    } // 3 массива, в каждом массиве 7 элементов(дата)
});

module.exports = mongoose.model('User', UserSchema);