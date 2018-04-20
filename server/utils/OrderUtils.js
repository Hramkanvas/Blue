const mongoose = require('mongoose');
const Order = require('../models/Order');;

module.exports = {
    uploadOrder,
    deleteOrder,
    getDayOrder,
    getOrder
}

function uploadOrder(Date, username, uploadOrder) {
    return Order.findOne({ Date })
        .then((OrderSchema) => {
            OrderSchema.Orders[username] = uploadOrder;

            if (OrderSchema) {
                const orders = OrderSchema.Orders;
                return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'Orders': orders } });
            }
            else {
                const Orders = {};
                Orders[username] = uploadOrder;

                OrderSchema = new Order({
                    Date,
                    Orders,
                })
                return OrderSchema.save();
            }
            return true;
        })
}


function deleteOrder(Date, username) {
    return Order.findOne({ Date })
        .then((OrderSchema) => {

            if (OrderSchema) {
                delete OrderSchema.Orders[username];
                const orders = OrderSchema.Orders;

                return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'Orders': orders } });
            }

            return false;
        })
}

function getDayOrder(Date) {
    return Order.findOne({ Date })
        .then(OrderSchema => {
            if (OrderSchema) {
                return OrderSchema.Orders;
            }
        });
}

function getOrder(Date, Username) {
    return Order.findOne({ Date })
        .then(OrderSchema => {
            console.log(OrderSchema);
            if (OrderSchema) {
                return OrderSchema.Orders[Username];
            }
        });
}
