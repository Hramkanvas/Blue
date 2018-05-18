import { queries } from "../../queries.js";
import { pieError } from "../pie_error/pie-error.js";

export let pieTableOrders = (function () {
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
        
        a {
            color: var(--grey-gark);
            text-decoration: none;
        }
        
        h1, h2, h3, h4, h5, h6, th {
            color: var(--grey-dark)
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
            color: var(--grey-dark);
            font-size: 14px;
        }
        
        .toolbar {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin:10px 0 10px 0;
        }
        
        .toolbar select {
            color: #757575;
            width: 24%;
            border: 2px solid #efefef;
        }
        
        .searchBox {
            width: 50%;
            height: 40px;
            font-size: 20px;
            border: 2px solid #efefef;
            display: flex;
        }
        
        .searchBox input {
            height: 100%;
            width: 100%;
            border:none;
            user-select: none;
        }
    .ordersTableHeader {
        width: 100%;
        background: #d6d6d6;
    }
    .ordersTable {
        border: var(--border-component);
        padding: 0px;
        width: 100%;
    }

    .ordersTableHeader > th, .ordersTable > td {
        padding-left: 15px;
    }


    .ordersTable tbody tr:nth-child(odd) {
        background: var(--white-grey);
    }

    .ordersTable tbody tr{
        height: 40px;
    }

    </style>
        
    <div class="toolbar">
            <div class="searchBox">
                <input placeholder="введите пользователя" id="inputZone" list="name">
                <datalist id="name">
                </datalist>
            </div>
        </div>
        <table id="ordersTable" class="ordersTable">
    </table>
    `;

    class TableOrdersClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.getPerson = this.getPerson.bind(this);
            this.nameList = this.shadowRoot.getElementById('name');
            this.inputZone = this.shadowRoot.getElementById('inputZone');
            this.ordersTable = this.shadowRoot.getElementById('ordersTable');
            this.loadOrders = this.loadOrders.bind(this);
            this.showAllUsers = this.showAllUsers.bind(this);
            this.loadNames = this.loadNames.bind(this);
        }

        showAllUsers() {
            let templ = ``;
            const usernames = Object.keys(this.orders);
            usernames.forEach(username => {
                const products = this.orders[username].info;
                let listOrders = "";
                const productsNames = Object.keys(products);
                productsNames.forEach(prod => {
                    listOrders += prod + "  -  " + products[prod].count + '<br>';
                });
                templ += `
                    <tr class="ordersTableHeader">
                        <th>${this.orders[username].FIO}</th>
                        <th>${listOrders}</th>
                        <th>${this.orders[username].price}</th>
                    </tr>
                    `;
            });
            this.ordersTable.innerHTML = templ;
        }

        loadNames(){
            let template1 = ``;
            const usernames = Object.keys(this.orders);
            usernames.forEach(username => {
                template1 += `
                    <option value="${this.orders[username].FIO}"></option>
                `;
            })
            this.nameList.innerHTML = template1;
        }

        loadOrders() {
            queries.getDayOrders().then(orders => {
                this.orders = orders;
                this.showAllUsers();
                this.loadNames();
            },
                error => {
                    console.log(error);
                });
        }

        connectedCallback() {
            this.inputZone.addEventListener('input', this.getPerson)
            this.loadOrders();
          
        }

        disconnectedCallback() {
            this.inputZone.removeEventListener('', getPerson);
        }
        getPerson(event) {
            let iNeedThisPerson = statisticsDay.personalStatistics.filter(item => item.name.toLowerCase().match(new RegExp(`^${this.inputZone.value.toLowerCase()}.*`)));
            if (iNeedThisPerson.length !== 0) {
                this.ordersTable.innerHTML = "";
                let appendingRes = "";
                iNeedThisPerson.forEach(function (item, i, arr) {
                    let templateOrder = `
                <tr class="ordersTableHeader">
                    <th>${item.name}</th>
                    <th>${item.listOfOrders}</th>
                    <th>${item.smthElse}</th>
                </tr> `
                    appendingRes += templateOrder;
                }.bind(this));
                this.ordersTable.innerHTML = appendingRes;
            } else {
                pieError.showError("Такой пользователь не найден.");
                this.inputZone.value = "";
                this.showAllUsers();
            }
        }

    }

    customElements.define('pie-table-orders', TableOrdersClass);
}());