import {queries} from "../../queries.js";

export let pieAuthorization = (function () {

    let template = `
    <style>
    
    p {
        font-size: 16px;
    }
      
    h1, h2, h3, h4, h5, h6, th {
        color: grey
    }
    
    body {
        display: flex;
        width: 100%;
        margin: 0 auto;
        min-width: 320px;
        flex-direction: column;             
        min-height: 100vh;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #7a7a7a;
    }
    
    .authorizationBlock {
        --fon: red;
        background: #ebebeb;
        border-radius: 3px;
        border: 1px solid #7a7a7a1a;
        padding: 30px;
        width: 500px;
        height: max-content;
        margin: 10% auto;
    }
    
    .bottomStuff h3 {
        font-size: 25px;
        text-align: center;
        margin-bottom: 25px;
    }
    
    .bottomStuff p {
        margin: 0;
        color: #444444;
        font-size: 100%;
        font-weight: bold;
    }
    
    button:hover {
        background: #72bb53;
    }
    
    button {
        display: flex;
        margin: 0 auto;
        border: none;
        color: white;
        font-size: 16px;
        outline: none;
        cursor: pointer;
        background: #3d8af7;
        padding: 5px 10px;
    }
    
    input {
        width: 100%;
        display: block;
        border: none;
        
        outline: none;
        padding: 10px;
        margin-bottom: 20px;
        background-color: white;
    }
    
    label {
        color: grey;
        font-size: 14px;
    }

    .authorizationBlockError{
        box-shadow: 0px 0px 15px darkred;
        transition: all 0.7s;
        background: #ebebeb;
        border-radius: 3px;
        border: 1px solid #7a7a7a1a;
        padding: 30px;
        width: 500px;
        height: max-content;
        margin: 10% auto;
    }
    
    </style>
    
    <div class="authorizationBlock" id="authorizationBlock">
        <div class="bottomStuff">
            <h3>Авторизация</h3>
        </div>
        <form name="authorize" id="authorizeForm">
            <label for="username">ИМЯ:</label>
            <input name="login" type="text" id="username">
            <label for="password">ПАРОЛЬ:</label>
            <input name="password" type="password" id="password">
            <button id="authorizeBt" type="button">Войти</button>
        </form>
    </div>
    `;

    class AuthorizationClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.authBtn = this.shadowRoot.getElementById('authorizeBt');
            this.authorize = this.authorize.bind(this);
            this.authorizationBlock = this.shadowRoot.getElementById('authorizationBlock');
            this.authorizeForm = this.shadowRoot.getElementById('authorizeForm');
            this.passwordInput = this.shadowRoot.getElementById("password");
            this.usernameInput = this.shadowRoot.getElementById("username");
        }

        connectedCallback() {
            this.authBtn.addEventListener("click", this.authorize);
            this.passwordInput.addEventListener("keyup", (event) => {
                event.preventDefault();
                if (event.keyCode === 13) {
                    this.authBtn.click();
                }
            });
            this.usernameInput.addEventListener("keyup", (event) => {
                event.preventDefault();
                if (event.keyCode === 13) {
                    this.authBtn.click();
                }
            })
        }

        disconnectedCallback() {
            this.authBtn.removeEventListener("click", this.authorize)
        }

        authorize(event) {
            const login = this.authorizeForm.elements.login.value;
            const password = this.authorizeForm.elements.password.value;
            queries.authorize(login, password).then(user => {
                    localStorage.setItem("user", JSON.stringify(user));
                    if (user.type === "admin") {
                        window.location.assign("./admin.html");
                    } else {
                        window.location.assign("./user.html");
                    }
                }
            ).catch(error => {
                this.authorizationBlock.className = "authorizationBlockError";
            });
        }
    }

    customElements.define('pie-authorization', AuthorizationClass);
}());