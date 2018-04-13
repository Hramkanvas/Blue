const methods = (function () {

    let login = function(login, password) {
        const fs = require('fs');
        const users = JSON.parse(fs.readFileSync("users.json"));
        let user = users.find((user) => user.login === login && user.password === password);
        return user;
    };

    return {
        login
    }

})();
module.exports = methods;

