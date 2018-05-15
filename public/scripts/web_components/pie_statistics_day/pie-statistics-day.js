export let pieStatisticsDayComponent = (function () {
    let statisticsDay = {
        personalStatistics: [ //example of how to organize json, which comes from the server on the getStatistics request
            {
                name: 'Someone1',
                listOfOrders: 'ListOfSomeone1Orders'
            },
            {
                name: 'Someone2',
                listOfOrders: 'ListOfSomeone2Orders'
            },
            {
                name: 'Someone3',
                listOfOrders: 'ListOfSomeone3Orders'
            }
        ],
        generalStatistics: [
            {
                foodName: 'Pies',
                quantity: 45
            },
            {
                foodName: 'Puddings',
                quantity: 34
            },
            {
                foodName: 'Cookies',
                quantity: 57
            },
            {
                foodName: 'Chocolates',
                quantity: 12
            },
        ]
    };
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
        <table id="generalStatisticsTable" class="ordersResult">
        
        </table>
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
            let insideTemplate = `<tbody>`;
            statisticsDay.generalStatistics.forEach(function (item) {
                insideTemplate += `
                <tr class="ordersResult-row">
                        <td>${item.foodName}</td>
                        <td>${item.quantity}</td>
                    </tr>
                `
            }.bind(this));
            insideTemplate += `</tbody>`;
            this.statisticsTable.innerHTML = insideTemplate;
        }
    }
    customElements.define('pie-statistics-day', GeneralStatisticsClass);
}());