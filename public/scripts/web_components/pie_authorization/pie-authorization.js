import {queries} from "../../queries.js";
import {templates} from "../templates/templates.js";
export let pieAuthorization = (function () {
let template = templates.pieAuthorizationTemplate;

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