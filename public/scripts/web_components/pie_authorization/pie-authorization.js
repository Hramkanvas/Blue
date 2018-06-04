import {queries} from "../../queries.js";
import {templates} from "../templates/templates.js";
export let pieAuthorization = (function () {
let template = templates.pieAuthorizationTemplate;

    class AuthorizationClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.authBtn = this.shadowRoot.getElementById('authorizeBt');
            this.authorizationBlock = this.shadowRoot.getElementById('authorizationBlock');
            this.authorizeForm = this.shadowRoot.getElementById('authorizeForm');
        }

        connectedCallback() {
            this.authorizeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.authorize();
            });
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
            )
            .catch(error => {
                let errorMessage = document.createElement("div");
                errorMessage.classList.add("errorMessage");
                errorMessage.innerHTML = "Ошибка"
                
                
                this.authorizationBlock.appendChild(errorMessage);
                this.authorizationBlock.classList.toggle("Error");
            });
        }
    }

    customElements.define('pie-authorization', AuthorizationClass);
}());