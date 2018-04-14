const menu = require('./menu_methods.js');

const m = menu.createMenu();

menu.saveMenu(m);

console.log(menu.getMenu(new Date(2018, 3, 18)));