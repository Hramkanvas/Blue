const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: { type: String },
    FIO:      { type: String },
    balance:  { type: Number },
    history:  { type: Object }

});

module.exports = mongoose.model('User', UserSchema);