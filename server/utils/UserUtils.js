const mongoose = require('mongoose');
const User = require('../models/User');;

module.exports = {

}

function getWeekOrder() {
    
}




















































// function getMenuWeek(date) {
//     let currentWeek;
//     let currentMenu;

//     return Week.find({}).then((arr) => {
//         [].forEach.call(arr, () => {
//             if (arr.Date - date < 0 && date - arr.Date < MilliSecondsInWeek) {
//                 currentWeek = arr;
//             }
//         })

//         let days = Object.keys(currentWeek.OrderInfo);
//         for (day in days) {
//             currentMenu.day = currentWeek.day.menu;
//         }

//         return currentMenu;
//     })
// }

// function getOrderByUserAndWeek(date, user) {
//     let currentWeek;
//     let currentOrder;

//     return Week.find({}).then((arr) => {
//         [].forEach.call(arr, () => {
//             if (arr.Date - date < 0 && date - arr.Date < MilliSecondsInWeek) {
//                 currentWeek = arr;
//             }
//         });

//         let days = Object.keys(currentWeek.OrderInfo);

//         for (day in days) {
//             currentOrder.day = currentWeek.OrderInfo.day.Order.user;
//         }

//         return currentOrder;
//     });
// }
// function addMenu(date, menu) {
//     let currentWeek;

//     return Week.find({}).then((arr) => {

//         [].forEach.call(arr, (week) => {
//             if (week.Date - date <= 0 && date - week.Date <= MilliSecondsInWeek) {
//                 currentWeek = week;
//             }
//         })

//         if (currentWeek) {
//             let days = Object.keys(currentWeek.OrderInfo);
//             for (day in days) {
//                 currentWeek.Order.day = menu.day;
//             }
//             return true;
//         }
//         else {
//             [].shift.call([].sort.call(arr, (el1, el2) => {
//                 return el1.Date - el2.Date;
//             }));

//             let days = Object.keys(menu);
//             let OrderInfo;

//             for (day in days) {
//                 OrderInfo.day['menu'] = menu.day;
//                 OrderInfo.day['Order'] = {};
//             }

//             const newWeek = new Week({
//                 Date: date,
//                 OrderInfo
//             });

//             return newWeek.save();
//         }


//     })
// }

// function addOrder(date, user, newOrder) {
//     findOrderByDay(date).then((Order)=>{
//         Order.user = newOrder;
//     })
// }

// function deleteOrder(date, user) {
//     findOrderByDay(date).then((Order)=>{
//         delete Order.user;
//     })
// }

// function findOrderByDay(date) {
//     let currentWeek;
//     return Week.find({}).then((arr) => {

//         [].forEach.call(arr, () => {
//             if (arr.Date - date < 0 && date - arr.Date < MilliSecondsInWeek) {
//                 currentWeek = arr;
//             }
//         })

//         let ind = (date.getDay() + 6) % 7;

//         return currentWeek.Order.DayNames[ind];
//     });
// }