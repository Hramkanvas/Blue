const mongoose = require('mongoose');
const Order = require('../models/Order');;

const moment = require('moment');

module.exports = {
    uploadOrder,
    deleteOrder,
    getDayOrders,
    getUserOrders,
    getOrderPrice,
    ordersForWeek,
    confirmDayOrders
};

function uploadOrder(date, username, uploadOrder) {

    if (validateTime(date)) {

        let resetedDate = moment(date).set({ 'h': 3, 'm': 0, 's': 0, 'ms': 0 });

        return Order.findOne({ Date: resetedDate })
            .then((OrderSchema) => {

                if (OrderSchema) {
                    if (!OrderSchema.isBlocked) {
                        OrderSchema.Orders[username] = uploadOrder;

                        const orders = OrderSchema.Orders;

                        return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'Orders': orders } });
                    }
                    else {
                        return false;
                    }

                }

                else {
                    const Orders = {};
                    Orders[username] = uploadOrder;

                    OrderSchema = new Order({
                        Date: resetedDate,
                        Orders,
                        isBlocked: false
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

function validateTime(date) {
    let now = moment().set({ 'h': 3, 'm': 0, 's': 0, 'ms': 0 });
    let severalDaysLater = moment(now).day(14);

    let resetdDate = moment(date).set({ 'h': 3, 'm': 0, 's': 0, 'ms': 0 });

    if (!moment(date).isSameOrAfter(now) || !moment(date).isBefore(severalDaysLater) || moment().day() === 0) {
        return false;
    }

    return true;
}

function deleteOrder(date, username) {

    let resetedDate = moment(date).set({ 'h': 3, 'm': 0, 's': 0, 'ms': 0 });

    return Order.findOne({ Date: resetedDate })
        .then((OrderSchema) => {
            if (OrderSchema) {
                if (!OrderSchema.Orders[username]) {
                    return false;
                }

                if (validateTime(date, OrderSchema.Orders[username])) {
                    return false;
                }

                if (!OrderSchema.isBlocked) {
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
    let resetedDate = moment(date).set({ 'h': 3, 'm': 0, 's': 0, 'ms': 0 });

    return Order.findOne({ Date: resetedDate })
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



function confirmDayOrders(date) {
    let resetedDate = moment(date).set({ 'h': 3, 'm': 0, 's': 0, 'ms': 0 });

    return Order.findOne({ Date: resetedDate })
        .then((OrderSchema) => {
            return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'isBlocked': true } });
        });
}


function isDayOrdersBlocked(){
    let resetedDate = moment(date).set({ 'h': 3, 'm': 0, 's': 0, 'ms': 0 });

    return Order.findOne({ Date: resetedDate })
        .then((OrderSchema) => {
            return OrderSchema.isBlocked;
        });
}