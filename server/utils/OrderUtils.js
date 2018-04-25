const mongoose = require('mongoose');
const Order = require('../models/Order');;

module.exports = {
    uploadOrder,
    deleteOrder,
    getDayOrders,
    getUserOrders,
    getOrderPrice
}

function uploadOrder(Date, username, uploadOrder) {
    if (validateOrder(uploadOrder)) {
        return Order.findOne({ Date })
            .then((OrderSchema) => {

                if (OrderSchema) {
                    OrderSchema.Orders[username] = uploadOrder;
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
            })
    }

    else {
        return new Promise((res, rej) => {
            res(false);
        })
    }
}

function validateOrder(order) {
    /*if (typeof order.price !== Number)
        return false;*/
    return true;
}

function deleteOrder(Date, username) {
    return Order.findOne({ Date })
        .then((OrderSchema) => {
            if (OrderSchema) {
                if (!OrderSchema.Orders[username])
                    return false;
                delete OrderSchema.Orders[username];
                if (Object.keys(OrderSchema.Orders).length === 0) {
                    return OrderSchema.remove();
                }

                const orders = OrderSchema.Orders;
                return Order.updateOne({'_id': OrderSchema._id}, {$set: {'Orders': orders}});
            }
            return false;
        });
}

function getDayOrders(Date) {
    return Order.findOne({ Date })
        .then(OrderSchema => {
            if (OrderSchema) {
                return OrderSchema.Orders;
            }
            return false;
        })
}

function getUserOrders(Date, username) {
    return getDayOrders(Date)
        .then(dayOrders => {
            return dayOrders[username];
        });
}

function getOrderPrice(Date, username) {
    return getUserOrders(Date, username).then((order) => {
        return order.price;
    })
}

function getTotal(Date) {
    return getDayOrders(Date)
        .then((dayOrders) => {
            let total = {};

            for (order in dayOrders) {
                for (dish in order.info) {
                    if (total[dish]) {
                        total[dish]++;
                    }
                    else {
                        total[dish] = 0;
                    }
                }
            }

            return total
        })
}