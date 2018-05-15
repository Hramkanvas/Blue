import { queries } from "../../queries.js";

export let pieGeneralInfo = (function go() {
    let userInfo = JSON.parse(localStorage.getItem("user"));

    let generalInfo = {
        week: "02.05.2018"
    }

    let template = `
        <style>
            .generalInfo {
                margin: 20px 0px;
                display: flex;
                justify-content: space-between;
            }

            .generalInfo p {
                font-size: 24px;
                font-weight: bold;
            }
        </style>

        <div class="generalInfo">
                <div class="timeShedule">
                    <p>Неделя ${generalInfo.week}</p>
                </div>
                <div class="countMoney" id = "moneyForWeek"> </div>
        </div>`;

    class GeneralInfo extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
        }

        connectedCallback() {
            if (userInfo.type !== "admin") {
                queries.getTotalPriceForWeek(userInfo.username).then(balance => {
                    let template = ` <p>Итого за неделю: ${balance.totalPriceForWeek} руб.</p>`;
                    this.shadowRoot.getElementById("moneyForWeek").innerHTML = template;
                }).catch(error => {

                });
            }
        }
    }

    customElements.define('pie-general-info', GeneralInfo);
})();

