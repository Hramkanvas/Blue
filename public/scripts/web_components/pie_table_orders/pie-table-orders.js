import {queries} from "../../queries.js";
import {pieError} from "../pie_error/pie-error.js";
import {templates} from "../templates/templates.js";

export let pieTableOrders = (function () {
    let template = templates.pieTableOrdersTemplate;

    class TableOrdersClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.getPerson = this.getPerson.bind(this);
            this.nameList = this.shadowRoot.getElementById('name');
            this.inputZone = this.shadowRoot.getElementById('inputZone');
            this.ordersTable = this.shadowRoot.getElementById('ordersTable');
            this.loadOrders = this.loadOrders.bind(this);
            this.showAllUsers = this.showAllUsers.bind(this);
            this.loadNames = this.loadNames.bind(this);
        }

        showAllUsers() {
            let templ = `<tr class="ordersTableHeader">
                        <th>Имя</th>
                        <th>Заказ</th>
                        <th>Сумма заказа</th>
                    </tr>`;
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

        loadNames() {
            let template1 = ``;
            const usernames = Object.keys(this.orders);
            usernames.forEach(username => {
                template1 += `
                    <option value="${this.orders[username].FIO}"></option>
                `;
            });
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
            this.inputZone.addEventListener('input', this.getPerson);
            this.loadOrders();
        }

        disconnectedCallback() {
            this.inputZone.removeEventListener('', getPerson);
        }

        getPerson(event) {
            const usernames = Object.keys(this.orders);
            let iNeedThisPerson = usernames.filter(item => this.orders[item].FIO.toLowerCase().match(new RegExp(`^${this.inputZone.value.toLowerCase()}.*`)));
            if (iNeedThisPerson.length !== 0) {
                this.ordersTable.innerHTML = ``;
                let appendingRes = `<tr class="ordersTableHeader">
                        <th>Имя</th>
                        <th>Заказ</th>
                        <th>Сумма заказа</th>
                    </tr>`;
                iNeedThisPerson.forEach(username => {
                    const products = this.orders[username].info;
                    let listOrders = "";
                    const productsNames = Object.keys(products);
                    productsNames.forEach(prod => {
                        listOrders += prod + "  -  " + products[prod].count + '<br>';
                    });
                    appendingRes += `
                    <tr class="ordersTableHeader">
                        <th>${this.orders[username].FIO}</th>
                        <th>${listOrders}</th>
                        <th>${this.orders[username].price}</th>
                    </tr>
                    `;
                });
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