

let authorizeModule = (function () {
    function initialFunc() {
        document.getElementById("authorize").addEventListener('click', authorize);
    }

    function authorize(event) {
        var authorizeForm = document.forms.authorize;
        var login = authorizeForm.elements.login.value;
        var password = authorizeForm.elements.password.value;
        user = queries.authorize(login, password).then(
            user => {
                console.log(user);
              },
              error => {
                console.log("PROOBLEM");
            }
        );
    }
    initialFunc();
})();