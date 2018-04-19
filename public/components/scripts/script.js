let authorizeModule = (function () {
    
    function initialFunc() {
        document.getElementById("authorize").addEventListener('click', authorize);
    }

    function authorize(event) {
        var authorizeForm = document.forms.authorize;
        var login = authorizeForm.elements.login.value;
        var password = authorizeForm.elements.password.value;
        console.log("PL");
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/login');
        xhr.setRequestHeader('content-type', 'application/json');
        value = {login:login, password:password};

        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                try{
                    user = JSON.parse(xhr.response);
                    alert("вы вошли:)");
                } catch(err){
                    document.getElementById("authorizationBlock").style.boxShadow = "0 1px 23px rgba(255, 0, 0, .12), 0 1px 22px rgba(255, 0, 0, .24)";
                }
            }
        }

        xhr.send(JSON.stringify(value));

        
    }
    initialFunc();
})();