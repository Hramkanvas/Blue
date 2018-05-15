export let queries = (function () {

   
    let myInit = {
        method: 'GET',
        body: undefined
    }

    function giveMeHeader(strType, strWhat){
        let myHeaders = new Headers();
        myHeaders.append(strType, strWhat);
        return myHeaders;
    }

    return {
        authorize: function (login, password) {
            myInit.method = 'POST';
            myInit.headers = giveMeHeader('Content-Type', 'application/json');
            myInit.body = JSON.stringify({ login: login, password: password });
            return fetch('/authorization/login', myInit).then(response => {
                return response.json();
            });
        },

        getMenu: function () {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', '/admin/getMenu');
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

        upBalance: function (username, sum) {
            myInit.method = 'PUT';
            myInit.headers = giveMeHeader('Content-Type', 'application/json');
            myInit.body = JSON.stringify({ username: username, amount: sum });
            return fetch('/admin/upBalance', myInit).then(response => {
                return response.json();
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

        getUsers: function () {
            myInit.method = 'GET';
            myInit.body = undefined;
            myInit.headers = giveMeHeader('Content-Type', 'application/json');
            return fetch('/admin/getUsers', myInit).then(response => {
                return response.json();
            });
        },

        getTodayOrdersStatistics: function (date) {
            return new Promise(function (resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', '/admin/getTodayOrdersStatistics');
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        let dayStatistics;
                        try {
                            dayStatistics = JSON.parse(xhr.response);
                        } catch (err) {
                            reject("you shall not take my statistics, cause smth gone wrong");
                        }
                        resolve(dayStatistics);
                    }
                };
                xhr.send();
            })
        },

        uploadMenu: function (file) {
            myInit.method = 'POST';
            myInit.body = file;
            myInit.headers = giveMeHeader('Content-Type', 'text/plain');
            return fetch('/admin/downloadMenu', myInit).then(response => {
                return response;
            });
        },

        getDayOrders: function () {
            myInit.method = 'GET';
            myInit.body = undefined;
            myInit.headers = giveMeHeader('Content-Type', 'application/json');
            return fetch('/admin/getDayOrders', myInit).then(response => {
                return response.json();
            });
        }
    }
})();

