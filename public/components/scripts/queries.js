let queries = (function () {
    return {
        authorize: function (login, password) {
            return new Promise(function(resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/login');
                xhr.setRequestHeader('content-type', 'application/json');
                value = { login: login, password: password };
    
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
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
        }
    }
})();