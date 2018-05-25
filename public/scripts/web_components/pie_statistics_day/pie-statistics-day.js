import { queries } from "../../queries.js";
import {templates} from "../templates/templates.js";
export let pieStatisticsDayComponent = (function () {
    let template = templates.pieStatisticsDayComponentTemplate;

    class GeneralStatisticsClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.statisticsTable = this.shadowRoot.getElementById("generalStatisticsTable");
        }

        connectedCallback() {
            this.fillTable()
        }

        fillTable() {
            queries.getTodayOrdersStatistics().then(result => {
                let insideTemplate = `<tbody>`;
                const keys = Object.keys(result);
                keys.forEach(key => {
                    if (key !== 'price') {
                        insideTemplate += `
                        <tr class="ordersResult-row">
                            <td>${key}</td>
                            <td>${result[key]}</td>
                        </tr>`
                    } else {
                        this.shadowRoot.getElementById('total').textContent += result[key] + " руб";
                    }
                });
                insideTemplate += `</tbody>`;
                this.statisticsTable.innerHTML = insideTemplate;
            });
        }
    }
    customElements.define('pie-statistics-day', GeneralStatisticsClass);
}());