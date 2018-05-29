import { queries } from "../../queries.js";
import {templates} from "../templates/templates.js";
export let pieGeneralInfo = (function go() {
    let userInfo = JSON.parse(localStorage.getItem("user"));

    let generalInfo = {
        week: "02.05.2018"
    };

    let template = templates.pieGeneralInfoTemplate;

    class GeneralInfo extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.choosenWeek = this.shadowRoot.getElementById('week');
            this.moneyForWeek = this.shadowRoot.getElementById('moneyForWeek');
            this.week = 1;
        }

        updateInfo() {     
            if (userInfo.type !== 'admin') {
                queries.getTotalPriceForWeek(userInfo.username, this.week).then(balance => {
                    const templateMoney = `<p>Сумма заказа на неделю: ${balance.totalPriceForWeek} руб.</p>`;
                    const templateWeek = `<p id="week">Неделя ${balance.range}</p>`;
                    this.moneyForWeek.innerHTML = templateMoney;
                    this.choosenWeek.innerHTML = templateWeek;
                })
                .catch(error => {
                });
            }
        }

        connectedCallback() {
            this.updateInfo();
        }

        static get observedAttributes() {
            return ['week'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.week = newValue;
            this.updateInfo();
        }
    }


    customElements.define('pie-general-info', GeneralInfo);
})();

