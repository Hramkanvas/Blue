const mongoose = require('mongoose');
const Menu = require('../models/Menu');;


module.exports = {
    findMenu,
    addMenu
}

function findMenu(fromDate) {
    return Menu.findOne({ fromDate })
        .then((menu) => {
            return menu
        });
}

function addMenu(file) {

    const menu = createMenu(file);
    if (validateMenu(menu)) {
        const menuSchema = new Menu({
            fromDate: menu.fromDate,
            menuInfo: menu.menuInfo
        });

        return menuSchema.save();
    }

    else {
        return new Promise((res, rej) => {
            res(false);
        });
    }
}


function createMenu(file = './server/files/menu.xlsx') {
    const XLSX = require('xlsx');
    const workbook = XLSX.readFile(file);

    const menuInfo = {};
    const sheets = workbook.Sheets[workbook.SheetNames[0]];

    let actual_day;
    let actual_food;

    for (sheet in sheets) {
        if (sheet[0] === 'A') {
            actual_day = sheets[sheet].v;
            menuInfo[actual_day] = {};
        }
        else if (sheet[0] === 'B') {
            actual_food = sheets[sheet].v;
            menuInfo[actual_day][actual_food] = {};
        }
        else if (sheet[0] === 'C') {
            menuInfo[actual_day][actual_food].weight = sheets[sheet].v;
        }
        else if (sheet[0] === 'D') {
            menuInfo[actual_day][actual_food].price = sheets[sheet].v;
        }
    }

    let date = Object.keys(menuInfo["Дата"])[0];
    let [fromDate, toDate] = date.split('-');

    fromDate = toNormalDateFrom(fromDate);

    delete menuInfo["Дата"];

    return { fromDate, menuInfo };
};


function toNormalDateFrom(date) {
    const [day, month, year] = date.split('.');
    return new Date(year, month - 1, day, 0, 0, 0, 0);
};


function validateMenu(menu) {

    if (!(menu.fromDate instanceof Date)) return false;
    if (menu.fromDate.getDay() !== 1) return false;

    const menuInfo = menu.menuInfo;

    for (days in menuInfo) {
        for (dish in menuInfo[days]) {
            if (isNaN(menuInfo[days][dish].price) || isNaN(menuInfo[days][dish].weight || 0)) return false;
        }
    }
    return true;
};