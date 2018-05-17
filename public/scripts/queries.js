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

    function ajax(method, strHeaderType, strHeaderContent, body, query){
        myInit.method = method;
        myInit.headers = giveMeHeader(strHeaderType, strHeaderContent);
        myInit.body = body;
        return fetch(query, myInit).then(response => {
            return response.json();
        });
    }

    return {
        authorize: function (login, password) {
            const object = { login: login, password: password };
            return ajax('POST', 'Content-Type', 'application/json', JSON.stringify(object), '/authorization/login');
        },

        upBalance: function (username, sum) {
            const object = { username: username, amount: sum };
            return ajax('PUT', 'Content-Type', 'application/json', JSON.stringify(object), '/admin/upBalance'); 
        },

        getUsers: function () {
            return ajax( 'GET', 'Content-Type', 'application/json', undefined, '/admin/getUsers');
        },

        uploadMenu: function (file) {
            const object = file;
            return ajax('POST', 'Content-Type', 'text/plain', file, '/admin/downloadMenu');
        },

        getDayOrders: function () {
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/admin/getDayOrders');
        }, 

        getTotalPriceForWeek: function(username, week){
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/getTotalPriceForWeek?username=' + username
                    + '&week=' + week);
        },

        isMakingOrdersForToday(){
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/admin/isMakingOrder');
        },

        confirmDayOrder(){
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/admin/confirmDayOrders');
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
    }
})();

