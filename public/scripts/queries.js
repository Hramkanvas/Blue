export let queries = (function () {
    return {
        authorize: function (login, password) {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/login');
                xhr.setRequestHeader('content-type', 'application/json');
                var value = { login: login, password: password };

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        var user;
                        try {
                            user = JSON.parse(xhr.response);
                        } catch (err) {
                            user = undefined;
                        }
                        resolve(user);
                    }
                }
                xhr.send(JSON.stringify(value));
            });
        },

        getMenu: function () {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', '/getMenu');
                xhr.setRequestHeader('content-type', 'application/json');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        var menu;
                        try {
                            menu = JSON.parse(xhr.response);
                        } catch (err) {
                            menu = undefined;
                        }
                        resolve(menu);
                    }
                }
                xhr.send();
            });
        },

        upBalance: function (id, sum) {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('PUT', '/upBalance');
                xhr.setRequestHeader('content-type', 'application/json');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        var user;
                        try {
                            user = JSON.parse(xhr.response);
                        } catch (err) {
                            //инфо об ошибке
                        }
                        resolve(user);
                    }
                }
                xhr.send(JSON.stringify({ id: id, sum: sum }));
            });
        },

        getTotalBalance: function (id) {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/getTotalBalance');
                xhr.setRequestHeader('content-type', 'application/json');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        var balance;
                        try {
                            balance = JSON.parse(xhr.response);
                        } catch (err) {
                            //инфо об ошибке
                        }
                        resolve(balance);
                    }
                }
                xhr.send(JSON.stringify({ id: id }));
            });
        },

        uploadMenu: function (file) {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/admin/downloadMenu');
                xhr.setRequestHeader('content-type', 'application/json');

                xhr.onreadystatechange = function () {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    if (xhr.status !== 200) {
                        console.log(xhr.status + ': ' + xhr.statusText);
                    }
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        console.log("DONE");
                        try {
                            //balance = JSON.parse(xhr.response);
                        } catch (err) {
                            
                        }
                        //resolve(balance);
                    }
    }
    xhr.send(JSON.stringify({ data: file }));
});
    }
    }
}) ();