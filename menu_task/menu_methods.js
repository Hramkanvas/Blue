const menu_methods = (function(){
    return{
        createMenu(){

            const XLSX = require('xlsx');
            const workbook = XLSX.readFile('files/menu.xlsx');

            const menu = {};
            const sheets = workbook.Sheets["Лист1"];

            let actual_day;
            let actual_food;

            for (sheet in sheets) {
                if (sheet[0] === 'A') {
                    actual_day = sheets[sheet].v;
                    menu[actual_day] = {};
                }
                else if (sheet[0] === 'B') {
                    actual_food = sheets[sheet].v;
                    menu[actual_day][actual_food] = {};
                }
                else if (sheet[0] === 'C') {
                    menu[actual_day][actual_food].weight = sheets[sheet].v;
                }
                else if (sheet[0] === 'D') {
                    menu[actual_day][actual_food].price = sheets[sheet].v;
                }
            }

            const DateInfo = menu["Дата"];
            delete menu["Дата"];

            return menu;
        },
        validateMenu(menu){
            for (days in menu) {
                if (typeof days !== String) return false;
                for (dish in menu[days]) {
                    if (typeof menu[days][dish] !== String) return false;
                }
            }
        }
    }
})();

console.log(menu_methods.createMenu());
module.exports = menu_methods;