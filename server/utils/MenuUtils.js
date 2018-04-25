const mongoose = require('mongoose');
const Menu = require('../models/Menu');;


module.exports = {
    findMenu,
    addMenu,
    getActuallAndNextMondayDate
}

function findMenu(fromDate) {
    return Menu.findOne({ fromDate })
}

function addMenu(file) {

    const menu = createMenu(file);
    if (validateMenu(menu)) {
        const menuSchema = new Menu({
            fromDate: menu.fromDate,
            menuInfo: menu.menuInfo
        });

        return Menu.find({}).then((arr) => {
            let idMenuToRemove;

            arr.forEach((el) => {
                if (el.fromDate === menuSchema.fromDate) {
                    idMenuToRemove = el._id;
                }
            })
            if (idMenuToRemove) {
                Menu.remove({ _id: idMenuToRemove })
                    .then(() => menuSchema.save())//заменяю
            }

            let [actuall, next] = getActuallAndNextMondayDate();

            if (arr.length === 3 && menuSchema.fromDate === actuall) {
                arr.sort((el1, el2) => {
                    return el2.fromDate - el1.fromDate;
                })

                Promise.all(arr[0].remove(), arr[1].remove())
                    .then(() => menuSchema.save())//удаляю самое старое, если не заменил
            }
            if (arr.length === 3 && menuSchema.fromDate === next) {
                arr.sort((el1, el2) => {
                    return el2.fromDate - el1.fromDate;
                })

                arr[0].remove()
                    .then(() => {
                        return menuSchema.save();
                    })//удаляю самое старое, если не заменил
            }

            console.log(typeof menuSchema.fromDate, typeof next);
            if (menuSchema.fromDate.toString() === next || menuSchema.fromDate.toString() === actuall) {
                console.log(229);
                return menuSchema.save();
            }

        })
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
    return new Date(year, month - 1, day, 0, 0, 0, 0).toString();
};


function getActuallAndNextMondayDate() {
    const today = new Date();
    const actuall = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1, 0, 0, 0, 0);

    const next = new Date(actuall.getFullYear(), actuall.getMonth(), actuall.getDate() - actuall.getDay() + 8, 0, 0, 0, 0);
    return [actuall.toString(), next.toString()];
}


function validateMenu(menu) {

    const [actuall, next] = getActuallAndNextMondayDate();

    if (menu.fromDate != actuall && menu.fromDate !== next) return false;

    const menuInfo = menu.menuInfo;

    for (days in menuInfo) {
        for (dish in menuInfo[days]) {
            if (isNaN(menuInfo[days][dish].price) || isNaN(menuInfo[days][dish].weight || 0)) return false;
        }
    }

    return true;
};