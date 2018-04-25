const mongoose = require('mongoose');

const Orderchema = new mongoose.Schema({

    Date: { type: Date },
    Orders: { type: Object }
    
});

module.exports = mongoose.model('Order', Orderchema);