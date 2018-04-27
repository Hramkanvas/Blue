const fs = require('fs');
const users = JSON.parse(fs.readFileSync('./server/files/users.json'));

const methods = (function () {
    let login = function(login, password) {
        let user = users.find((user) => user.login === login && user.password === password);
        return user;
    };

    let addBalance = function (id,sum) {
        let user = users.find((user) => user.id === id);
        user.balance = (+sum + +user.balance).toString();
        fs.writeFileSync('server/files/users.json', JSON.stringify(users))
        return user;
    }

    return {
        login,
        addBalance
    }

})();
module.exports = methods;

