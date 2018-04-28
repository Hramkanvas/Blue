const mongoose = require('mongoose');
const Order = require('../models/Order');;

const milliSecondsInWeek = 7 * 24 * 60 * 60 * 1000;

module.exports = {
    uploadOrder,
    deleteOrder,
    getDayOrders,
    getUserOrders,
    getOrderPrice,
    ordersForWeek,
};

function uploadOrder(date, username, uploadOrder) {
    if (validateOrder(uploadOrder, date)) {
        return Order.findOne({ Date: date })
            .then((OrderSchema) => {

                if (OrderSchema && OrderSchema.Orders[username] && OrderSchema.Orders[username].isAvailable) {
                    OrderSchema.Orders[username] = uploadOrder;
                    const orders = OrderSchema.Orders;
                    return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'Orders': orders } });
                }

                else {
                    const Orders = {};
                    Orders[username] = uploadOrder;

                    OrderSchema = new Order({
                        Date: date,
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

function ordersForWeek(dates, username) {
    let getOrders = [];

    for (let date of dates) {
        getOrders.push(getUserOrders(date, username));
    }

    return Promise.all(getOrders);
}

function validateOrder(order, date) {
    let [actuall, next] = getActuallAndNextMondayDate();

    if (+new Date(date) >= +new Date(actuall) && +new Date(date) <= +new Date(next) + milliSecondsInWeek) {
        return false;
    }

    return true;
}


function getActuallAndNextMondayDate() {
    const today = new Date();
    const actuall = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1, 0, 0, 0, 0);

    const next = new Date(actuall.getFullYear(), actuall.getMonth(), actuall.getDate() - actuall.getDay() + 8, 0, 0, 0, 0);
    return [actuall.toString(), next.toString()];
}


function deleteOrder(Date, username) {
    return Order.findOne({ Date })
        .then((OrderSchema) => {
            if (OrderSchema) {
                if (!OrderSchema.Orders[username])
                    return false;
                if (OrderSchema.Orders[username].isAvailable) {

                    delete OrderSchema.Orders[username];
                    if (Object.keys(OrderSchema.Orders).length === 0) {
                        return OrderSchema.remove();
                    }

                    const orders = OrderSchema.Orders;
                    return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'Orders': orders } });

                }
                return false;
            }
            return false;
        });
}

function getDayOrders(date) {
    return Order.findOne({ Date: date })
        .then(OrderSchema => {
            if (OrderSchema) {
                return OrderSchema.Orders;
            }
            return false;
        })
}

function getUserOrders(date, username) {
    return getDayOrders(date)
        .then(dayOrders => {
            console.log(dayOrders);
            dayOrders[username].date = date;
            return dayOrders[username];
        });
}

function getOrderPrice(date, username) {
    return getUserOrders(date, username).then((order) => {
        return order.price;
    })
}

function getTotal(date) {
    return getDayOrders(date)
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

            return total;
        })
}