export let queries = (function () {


    let myInit = {
        method: 'GET',
        body: undefined
    };

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

    function ajaxWithoutJson(method, strHeaderType, strHeaderContent, body, query){
        myInit.method = method;
        myInit.headers = giveMeHeader(strHeaderType, strHeaderContent);
        myInit.body = body;
        return fetch(query, myInit).then(response => {
            return response;
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
            myInit.method = 'POST';
            myInit.headers = giveMeHeader('Content-Type', 'text/plain');
            myInit.body = file;
            return fetch('/admin/uploadMenu', myInit).then(res => res.json())
                .then(response => {
                    return response;
                });
        },

        getDayOrders: function () {
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/admin/getDayOrders');
        },

        getTotalPriceForWeek: function(username, week) {
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/getTotalPriceForWeek?username=' + username
                    + '&week=' + week);
        },

        isMakingOrdersForToday(){
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/admin/isMakingOrder');
        },

        confirmDayOrder(){
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/admin/confirmDayOrders');
        },

        getMenu: function (weekNumber) {
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/admin/getMenu?number=' + weekNumber);
        },

        setUserDayOrder: function(currentDayObject) {
            myInit.method = 'PUT';
            myInit.headers = giveMeHeader('Content-Type', 'application/json');
            myInit.body = JSON.stringify(currentDayObject);
            return fetch('/makeOrder', myInit).then(response => {
                return response;
            });
        },

        getTodayOrdersStatistics: function (date) {
            return ajax('GET', 'Content-Type', 'application/json', undefined, '/admin/getDayOrdersStatistic');
        },

        getMainPageUser: function(username, weekNumber){
            const obj = {username: username, number: weekNumber};
            return ajax('POST', 'Content-Type', 'application/json', JSON.stringify(obj), '/getMainPage');
        }
        ,
        deleteOrder: function(userInformation){
            return ajaxWithoutJson('DELETE', 'Content-Type', 'application/json', JSON.stringify(userInformation),  '/deleteOrder');
        }
    }
})();
