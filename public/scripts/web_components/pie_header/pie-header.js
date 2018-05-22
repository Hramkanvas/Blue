import {templates} from "../templates/templates.js";

export let pieHeaderContent = (function () {

    let userInfo = JSON.parse(localStorage.getItem("user"));

    let template = templates.pieHeaderStyleTemplate + `<div class="header-content">
            <div class="logo">
                <img src="img/logoExadel.png" alt="logoExadel">
            </div>
            <div class="userInfo">
            <span class="userInfoBalans" id = "balance"> </span>
                <span class="userInfoName">
                    ${userInfo.FIO}
                </span>
                <span class="userInfoButton">
                    <a>Выход</a>
                </span>
            </div>
        </div>
    `;

    class HeaderContent extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.exitButton = this.shadowRoot.querySelector("span.userInfoButton");
            this.out = this.out.bind(this);

            if (userInfo.type !== "admin") {
                let temp = `Баланс: <b>${userInfo.balance}</b> руб.`;
                this.shadowRoot.getElementById("balance").innerHTML = temp;
            }
        }

        connectedCallback() {
            this.exitButton.addEventListener("click", this.out);
        }

        out() {
            window.location.assign("./");
        }

        disconnectedCallback() {
            this.exitButton.removeEventListener("click", this.out);
        }

    }

    customElements.define('pie-header-content', HeaderContent);

})();

