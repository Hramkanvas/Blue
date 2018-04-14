const fs = require('fs');
const saved_menu_path = 'files/saved_menu.json';

module.exports = {

    createMenu() {
        const XLSX = require('xlsx');
        const workbook = XLSX.readFile('files/menu.xlsx');

        const menuData = {};
        const sheets = workbook.Sheets["Лист1"];

        let actual_day;
        let actual_food;

        for (sheet in sheets) {
            if (sheet[0] === 'A') {
                actual_day = sheets[sheet].v;
                menuData[actual_day] = {};
            }
            else if (sheet[0] === 'B') {
                actual_food = sheets[sheet].v;
                menuData[actual_day][actual_food] = {};
            }
            else if (sheet[0] === 'C') {
                menuData[actual_day][actual_food].weight = sheets[sheet].v;
            }
            else if (sheet[0] === 'D') {
                menuData[actual_day][actual_food].price = sheets[sheet].v;
            }
        }

        let date = Object.keys(menuData["Дата"])[0];
        date = date.split('-');

        const fromDate = date[0];
        const toDate = date[1];

        delete menuData["Дата"];

        return { fromDate, toDate, menuData };
    },
    
    validateMenu(WeekMenu) {

        const menu = WeekMenu.menuData;
        for (days in menu) {
            for (dish in menu[days]) {
                if (isNaN(menu[days][dish].price) || isNaN(menu[days][dish].weight || 0)) return false;
            }
        }
        return true;
    },

    saveMenu(WeekMenu) {
        if (this.validateMenu(WeekMenu)) {
            let saved_menu;

            let fileData = fs.readFileSync(saved_menu_path);
            if (fileData.length !== 0) {
                saved_menu = JSON.parse(fileData);
            }
            else {
                saved_menu = [];
            }

            saved_menu.push(WeekMenu);
            fs.writeFileSync(saved_menu_path, JSON.stringify(saved_menu));
            return true;
        }

        else {
            return;
        }

    },
    getMenu(date) {
        let fileData = fs.readFileSync(saved_menu_path);
        if (fileData.length !== 0) {
            saved_menu = JSON.parse(fileData);
        }
        else {
            saved_menu = [];
        }

        for (menu of saved_menu) {
             if(this.stringToDate(menu.fromDate) - date>0 && this.stringToDate(menu.toDate)-date<0) return menu;
        }

        return;
    },

    stringToDate(str) {
        let dataArray = str.split('.');

        return new Date(dataArray[2], dataArray[1], dataArray[0], 0, 0, 0, 0);
    }
}