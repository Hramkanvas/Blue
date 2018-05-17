const mongoose = require('mongoose');

const Orderchema = new mongoose.Schema({
    Date: { type: Date },
    Orders: { type: Object },
    isBlocked: { type: Boolean }
});

module.exports = mongoose.model('Order', Orderchema);
