const mongoose = require('mongoose');
const Order = require('../models/Order');
const moment = require('moment');
const {
    NotValidTimeErrorMessage,
    SuccessfullyUpdatedOrderMessage,
    SuccessfullyAddedOrderMessage,
    SuccessfullyDeletedOrderMesssage,
    NoUserOrderErrorMessage,
    DayOrdersBlockedErrorMessage,
    UnhandledErrorMessage,
    SuccessfullyAddedDayOrdersMessage,
    NoOrdersErrorMessage,
    DayOrdersAreAlreadyBlockedErrorMessage
} = require('../constants/orders');


module.exports = {
    uploadOrder,
    deleteOrder,
    getDayOrders,
    getUserOrders,
    getOrderPrice,
    ordersForWeek,
    getTotal,
    confirmDayOrders,
    isDayOrdersBlocked
};




function createDayOrdersSchema(date) {
    let resetedDate = resetDate(date);

    return Order.findOne({ Date: resetedDate }).then((OrderSchema) => {
        if (!OrderSchema) {
            OrderSchema = new Order({
                Date: resetedDate,
                Orders: {},
                isBlocked: false
            });
            return OrderSchema.save()
                .then(() => {
                    return { message: SuccessfullyAddedDayOrdersMessage }
                });
        }
    })
}

function uploadOrder(date, username, uploadOrder) {

    if (validateTime(date)) {
        let resetedDate = resetDate(date);

        uploadOrder.price = calculateOrderPrice(uploadOrder);

        return Order.findOne({ Date: resetedDate })
            .then((OrderSchema) => {
                if (OrderSchema) {
                    if (!OrderSchema.isBlocked) {
                        OrderSchema.Orders[username] = uploadOrder;
                        const orders = OrderSchema.Orders;
                        return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'Orders': orders } })
                            .then(() => {
                                return { message: SuccessfullyUpdatedOrderMessage }
                            });
                    }
                    else {
                        throw new Error(DayOrdersBlockedErrorMessage);
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
                    return OrderSchema.save()
                        .then(() => {
                            return { message: SuccessfullyAddedOrderMessage }
                        });
                }
            })
    }

    else {
        return new Promise((res, rej) => {
            throw new Error(NotValidTimeErrorMessage);
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
    let now = moment().set({ 'h': 0, 'm': 0, 's': 0, 'ms': 0 });
    let severalDaysLater = moment(now).day(14);

    if (!moment(date).isSameOrAfter(now) || !moment(date).isBefore(severalDaysLater) || moment().day() === 0) {
        return false;
    }

    return true;
}

function deleteOrder(date, username) {

    let resetedDate = resetDate(date);

    return Order.findOne({ Date: resetedDate })
        .then((OrderSchema) => {
            if (OrderSchema) {
                if (!OrderSchema.Orders[username]) {
                    return { message: NoUserOrderErrorMessage };
                }

                if (!validateTime(date, OrderSchema.Orders[username])) {
                    return { message: NotValidTimeErrorMessage };
                }

                if (!OrderSchema.isBlocked) {
                    delete OrderSchema.Orders[username];
                    if (Object.keys(OrderSchema.Orders).length === 0) {
                        return OrderSchema.remove()
                            .then(() => {
                                return { message: SuccessfullyDeletedOrderMessage }
                            });
                    }

                    const orders = OrderSchema.Orders;
                    return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'Orders': orders } })
                        .then(() => {
                            return { message: SuccessfullyDeletedOrderMessage }
                        });
                }

                throw new Error(UnhandledErrorMessage);
            }
            throw new Error(NoOrdersErrorMessage);
        });
}

function getDayOrders(date) {
    let resetedDate = resetDate(date);

    return Order.findOne({ Date: resetedDate })
        .then(OrderSchema => {
            if (OrderSchema) {
                return OrderSchema.Orders;
            }
            throw new Error(NoOrdersErrorMessage);
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
            let total = {price: 0};
            for (user in dayOrders) {
                for (dish in dayOrders[user].info) {
                    if (total[dish]) {
                        total[dish] += +dayOrders[user].info[dish].count;
                    }
                    else {
                        total[dish] = +dayOrders[user].info[dish].count;
                    }
                }
                total.price += +dayOrders[user].price;
            }

            return total;
        })
}


function confirmDayOrders(date) {
    let resetedDate = resetDate(date);

    return Order.findOne({ Date: resetedDate })
        .then((OrderSchema) => {
            if (!OrderSchema.isBlocked) {
                return Order.updateOne({ '_id': OrderSchema._id }, { $set: { 'isBlocked': true } });
            }

            throw new Error(DayOrdersAreAlreadyBlockedErrorMessage);
        });
}


function isDayOrdersBlocked() {
    let resetedDate = resetDate();

    return Order.findOne({ Date: resetedDate })
        .then((OrderSchema) => {
            return OrderSchema.isBlocked;
        });
}

function resetDate(date) {
    return moment(date).set({ 'h': 3, 'm': 0, 's': 0, 'ms': 0 });
}