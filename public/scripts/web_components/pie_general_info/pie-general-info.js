export let pieGeneralInfo = (function go() {

    let generalInfo = {
        week: "02.05.2018",
        balance: 90
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
                <div class="countMoney">
                    <p>Итого за неделю: ${generalInfo.balance} руб.</p>
                </div>
        </div>`;

    class GeneralInfo extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
        }
    }

    customElements.define('pie-general-info', GeneralInfo);
})();

