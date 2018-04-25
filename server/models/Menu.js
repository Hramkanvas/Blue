const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    fromDate: { type: Date, required: true },
    menuInfo: { type: Object, required: true }
});

module.exports = mongoose.model('Menu', MenuSchema);

//удаление самого раннего меню. 