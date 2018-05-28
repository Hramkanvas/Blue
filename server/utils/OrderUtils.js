const mongoose = require('mongoose');
const Order = require('../models/Order');
const moment = require('moment');
const ERROR_MESSAGES = require('../constants/orders');


module.exports = {
    uploadOrder,
    deleteOrder,
    getDayOrders,
    getUserOrders,
    getOrderPrice,
    ordersForWeek,
    getTotal,
    confirmDayOrders,
    isDayOrdersBlocked,
    createDayOrdersSchema
};


function createDayOrdersSchema(date) {
    let resetedDate = resetDate(date);

    return Order.findOne({Date: resetedDate}).then((OrderSchema) => {
        if (!OrderSchema) {
            OrderSchema = new Order({
                Date: resetedDate,
                Orders: {},
                isBlocked: false
            });
            return OrderSchema.save();
        }
    })
}

function uploadOrder(date, username, uploadOrder) {

    if (validateTime(date)) {
        let resetedDate = resetDate(date);

        uploadOrder.price = calculateOrderPrice(uploadOrder);

        return Order.findOne({Date: resetedDate})
            .then((OrderSchema) => {
                if (OrderSchema) {
                    if (!OrderSchema.isBlocked) {
                        OrderSchema.Orders[username] = uploadOrder;
                        const orders = OrderSchema.Orders;
                        return Order.updateOne({'_id': OrderSchema._id}, {$set: {'Orders': orders}});
                    }
                    else {
                        throw new Error(ERROR_MESSAGES.DAY_ORDERS_BLOCKED);
                    }

                }
                else {
                    const Orders = {};
                    Orders[username] = uploadOrder;

                    OrderSchema = new Order({
                        Date: resetedDate,
                        Orders,
                        isBlocked: false
                    });
                    return OrderSchema.save();
                }
            })
    }

    else {
        return new Promise((res, rej) => {
            throw new Error(ERROR_MESSAGES.NOT_VALID_TIME);
        })
    }
}

function ordersForWeek(weekNumber, dates, username) {
    let getOrders = [];

    for (let i = 1; i < 7; i++) {
        let date = resetDate(moment().day((weekNumber - 1) * 7 + 1).day(i));
        //let date = resetedDate.day(i);
        let is = dates.some((item) => {
            return resetDate(item).isSame(date)
        });
        if (is) {
            getOrders.push(getUserOrders(date, username));
        }
        else {
            // getOrders.push(new Promise((res, rej) => {
            //     if (validateTime(date)) {
            //         res({isBlocked: false});
            //     }
            //     else {
            //         res({isBlocked: true});
            //     }
            // }))
            getOrders.push(isDayOrdersBlocked(date)
                .then((isBlocked) => {
                    if (isBlocked) {
                        return {isBlocked, date};
                    }
                    if (validateTime(date)) {
                        return {isBlocked: false, date}
                    }
                    else {
                        return {isBlocked: true, date};
                    }
                }))

        }
    }

    return Promise.all(getOrders);
}

function validateTime(date) {
    let now = moment().set({'h': 0, 'm': 0, 's': 0, 'ms': 0});
    let severalDaysLater = moment(now).day(14);

    if (!moment(date).isSameOrAfter(now) || !moment(date).isBefore(severalDaysLater) || moment().day() === 0) {
        return false;
    }

    return true;
}

function deleteOrder(date, username) {

    let resetedDate = resetDate(date);

    return Order.findOne({Date: resetedDate})
        .then((OrderSchema) => {
            if (OrderSchema) {
                if (!OrderSchema.Orders[username]) {
                    throw new Error(ERROR_MESSAGES.NO_USER_ORDER);
                }

                if (!validateTime(date, OrderSchema.Orders[username])) {
                    throw new Error(ERROR_MESSAGES.NOT_VALID_TIME);
                }

                if (!OrderSchema.isBlocked) {
                    delete OrderSchema.Orders[username];
                    if (Object.keys(OrderSchema.Orders).length === 0) {
                        return OrderSchema.remove();
                    }

                    const orders = OrderSchema.Orders;
                    return Order.updateOne({'_id': OrderSchema._id}, {$set: {'Orders': orders}});
                }

                throw new Error(ERROR_MESSAGES.UNHANDLED);
            }
            throw new Error(ERROR_MESSAGES.NO_ORDERS);
        });
}

function getDayOrders(date) {
    let resetedDate = resetDate(date);

    return Order.findOne({Date: resetedDate})
        .then(OrderSchema => {
            if (OrderSchema) {
                return OrderSchema;
            }
            throw new Error(ERROR_MESSAGES.NO_ORDERS);
        })
}

function getUserOrders(date, username) {
    return getDayOrders(date)
        .then(dayOrders => {
            let {Orders} = dayOrders;
            Orders[username].date = date;
            Orders[username].isBlocked = dayOrders.isBlocked;
            return Orders[username];
        });
}

function getOrderPrice(date, username) {
    return getUserOrders(date, username).then((order) => {
        return order.price;
    })
}

function calculateOrderPrice(order) {
    let price = 0;
    for (dish in order.info) {
        price += order.info[dish].cost * order.info[dish].count;
    }
    return price;
}

function getTotal(date) {
    return getDayOrders(date)
        .then((dayOrders) => {
            let {Orders} = dayOrders;
            let total = {price: 0};
            for (user in Orders) {
                for (dish in Orders[user].info) {
                    if (total[dish]) {
                        total[dish] += +Orders[user].info[dish].count;
                    }
                    else {
                        total[dish] = +Orders[user].info[dish].count;
                    }
                }
                total.price += +Orders[user].price;
            }

            return total;
        })
}


function confirmDayOrders(date) {
    let resetedDate = resetDate(date);

    return Order.findOne({Date: resetedDate})
        .then((OrderSchema) => {
            if (!OrderSchema.isBlocked) {
                return Order.updateOne({'_id': OrderSchema._id}, {$set: {'isBlocked': true}});
            }

            throw new Error(ERROR_MESSAGES.DAY_ORDERS_ARE_ALREADY_BLOCKED);
        });
}



function isDayOrdersBlocked(date) {
    let resetedDate = resetDate(date);

    return Order.findOne({Date: resetedDate})
        .then((OrderSchema) => {
            if (OrderSchema) {
                return OrderSchema.isBlocked;
            }
            return;
        });
}

function resetDate(date) {
    return moment(date).set({'h': 3, 'm': 0, 's': 0, 'ms': 0});
}