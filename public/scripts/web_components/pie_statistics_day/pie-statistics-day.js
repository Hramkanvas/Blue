import { queries } from "../../queries.js";

export let pieStatisticsDayComponent = (function () {
    let template = `
    <style>
    html {
	height: 100%
    }
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    h3 {
        display: block;
        font-size: 1.17em;
        font-weight: bold;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    
    table {
        padding: 0px 20px 30px 20px;
        text-align: left;
        width: 100%;
    }
    
    th {
        padding-bottom: 20px;
        font-size: 18px;
        padding-top: 10px;
    }
    
    tr {
        width: 100%;
    }
    
    td {
        font-size: 18px;
        padding-right: 35px;
        padding-bottom: 3px;
    }
    p {
        font-size: 16px;
    }
      
    h1, h2, h3, h4, h5, h6, th {
        color: grey
    }
    

    
    .statistics {
        margin: 40px 0px;
        background: #e7e6e6;
        width: 100%;
        min-height: 70px;
        text-align: center;
        padding: 15px 0px;
        border-radius: var(--border-radius-component);
        border: var(--border-component);
    }
    
    .ordersResult {
        display: flex;
        padding-top: 20px;
        justify-content: center;
    }
    
    .ordersResult td {
        padding: 0px 70px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #7a7a7a;  
    }
    
    .ordersResult tr:nth-child(odd) {
        background: #afafaf59;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        color: #7a7a7a;  
    }
    
    </style>
    
    <div class="statistics">
        <h3>Итоговый заказ</h3>
        <table id="generalStatisticsTable" class="ordersResult"> </table>
        <h3 id = "total">Итого: </h3>
    </div>
    `;

    class GeneralStatisticsClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.statisticsTable = this.shadowRoot.getElementById("generalStatisticsTable");
            this.fillTable = this.fillTable.bind(this);
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