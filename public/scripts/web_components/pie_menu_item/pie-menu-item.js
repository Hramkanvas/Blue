import {menu} from '../pie_items/pie-items.js'
import {orders} from '../pie_items/pie-items.js'
import {queries} from "../../queries.js";
import {templates} from "../templates/templates.js";

export let pieMenuItem = (function () {
    let template = templates.pieMenuItemTemplate;
    let userInfo = JSON.parse(localStorage.getItem("user"));

    class MenuItem extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.renderTable = this.renderTable.bind(this);
            this.itemState = this.itemState.bind(this);
            this.day = this.shadowRoot.querySelector(".itemFunc");
            this.place = this.shadowRoot.querySelector("tbody");
            this.clearButtonFunction = this.clearButtonFunction.bind(this);
            this.rewriteCurrentDayObject = this.rewriteCurrentDayObject.bind(this);
            this.editButtonFunction = this.editButtonFunction.bind(this);
            this.sendOrderFunction = this.sendOrderFunction.bind(this);
            this.makeOrderFunction = this.makeOrderFunction.bind(this);
            this.item = this.shadowRoot.querySelector(".item");
            this.rerenderTable = this.rerenderTable.bind(this);
            this.table = ``;
            this.dayName = ``;
            this.totalForDay = 0;
            this.currentDayObject = {};
        }

        connectedCallback() {

            this.shadowRoot.querySelector(".item").addEventListener("counter", function (e) {
                let priceChange = e.detail.priceChange;
                let pastPrice = +this.shadowRoot.getElementById("price").innerText;
                let place = this.shadowRoot.getElementById("price");
                place.innerHTML = `${pastPrice + priceChange}`
            }.bind(this));

        }

        static get observedAttributes() {
            return ['data-day', 'data-state', 'data-holder'];
        }

        attributeChangedCallback(attrName, oldVal, newVal) {
            switch (attrName) {
                case 'data-day':
                    this.renderTable(newVal);
                    break;
                case 'data-state':
                    this.itemState(newVal);
                    break;
            }
        }

        dayNameToNum(dayName) {
            switch (dayName) {
                case "пн":
                    return 1;
                case "вт":
                    return 2;
                case "ср":
                    return 3;
                case "чт":
                    return 4;
                case "пт":
                    return 5;
                case "сб":
                    return 6;
                case "вс":
                    return 7;
                default:
                    return -1;
            }
        }

        renderTable(attr) {
            if (this.getAttribute('data-holder') === "admin") {
                this.dayName = attr;
                this.day.innerHTML = `<h5>${attr}</h5>`;
                this.rerenderTable(this.dayName);
            }
            else {
                this.dayName = attr;
                this.day.innerHTML = `<h5>${attr}</h5>`;
                this.currentDayObject = orders.find((element) => {
                    return (new Date(element.date)).getDay() === this.dayNameToNum(attr)
                });
                this.rerenderTable(this.dayName);
            }
        }

        rerenderTable(day) {
            let foodList;
            if (this.getAttribute('data-holder') === "admin") {
                foodList = Object.keys(menu.menuInfo[day]);
                this.table = ``;
                foodList.forEach(food => {
                    this.table += `<tr><td>${food}</td><td><b>${menu.menuInfo[day][food].weight}</b> руб.</td></tr>`
                });
            } else {
                foodList = Object.keys(this.currentDayObject.info);
                this.table = ``;
                foodList.forEach(food => {
                    this.table += `<tr><td>${food}</td><td><b>${this.currentDayObject.info[food].cost}</b> руб.</td></tr>`
                });
                this.totalForDay = this.currentDayObject.price;
            }
        }

        itemState(attr) {

            let itemState = this.shadowRoot.querySelector(".item");

            switch (attr) {
                case "pastMenu":
                    this.item.innerHTML = `
                        <div class="itemFunc">
                            <h5>${this.dayName}</h5>
                        </div>

                        <div class="itemMenu">
                            <table>
                                <caption>Оформленный заказ:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                        <div class="price">
                            Итого: ${this.totalForDay} руб.
                        </div>`;
                    itemState.classList.add(attr);
                    break;

                case "futureMenu":
                    this.item.innerHTML = `
                    <link rel="stylesheet" type="text/css" href="styles/font-awesome.css">
                        <div class="itemFunc">
                            <h5>${this.dayName}</h5>
                            <div class="itemFuncButtons">
                                <span id="editButton">
                                    <i class="fa fa-pencil"></i>
                                </span>

                                <span id="clearButton">
                                    <i class="fa fa-trash"></i>
                                </span>
                            </div>
                        </div>

                        <div class="itemMenu">
                            <table>
                                <caption>Оформленный заказ:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                        <div class="price">
                            Итого: ${this.totalForDay} руб.
                        </div>
                    `;
                    let editButton = this.shadowRoot.getElementById("editButton");
                    editButton.addEventListener("click", this.editButtonFunction);
                    var clearButton = this.shadowRoot.getElementById("clearButton");
                    clearButton.addEventListener("click", this.clearButtonFunction);
                    itemState.classList.add(attr);
                    break;

                case "clear":

                    this.item.innerHTML = `
                    <link rel="stylesheet" type="text/css" href="styles/font-awesome.css">
                        <div class="itemFunc">
                            <h5>${this.dayName}</h5>
                        </div>

                        <div class="itemMenu">
                            <table>
                                <caption>Меню на день:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                        <button class="orderButton" id="makeOrder">
                            Сформировать заказ
                        </button>
                    `;
                    let makeOrder = this.shadowRoot.getElementById("makeOrder");
                    makeOrder.addEventListener("click", this.makeOrderFunction);
                    itemState.classList.remove("editMenu", "futureMenu", "pastMenu");

                    break;

                case "editMenu":

                    this.item.innerHTML = `
                    <link rel="stylesheet" type="text/css" href="styles/font-awesome.css">
                        <div class="itemFunc">
                            <h5>${this.dayName}</h5>
                            <div class="itemFuncButtons">
                                <span  id="clearButton">
                                    <i class="fa fa-trash"></i>
                                </span>
                            </div>
                        </div>

                        <div class="itemMenu">
                            <table>
                                <caption>Меню на день:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th><th>Кол-во</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                        <div class="    price edit">Итого: <b id="price">${this.totalForDay}</b> руб.</div>
                        <button class="orderButton edit" id="sendOrder">Заказать</button>
                    `;

                    var clearButton = this.shadowRoot.getElementById("clearButton");
                    clearButton.addEventListener("click", this.clearButtonFunction);
                    let sendOrder = this.shadowRoot.getElementById("sendOrder");
                    sendOrder.addEventListener("click", this.sendOrderFunction);
                    itemState.classList.add(attr);
                    let foodList = Object.keys(this.currentDayObject.info);
                    let trs = this.shadowRoot.querySelectorAll("tr~tr");
                    let index = 0;

                    trs.forEach(item => {
                        let td = document.createElement("td");
                        let counter = document.createElement("pie-counter");
                        const foodName = foodList[index];
                        this.currentDayObject.info[foodName].count = this.currentDayObject.info[foodName].count || 0;
                        counter.setAttribute("count", this.currentDayObject.info[foodName].count);
                        td.appendChild(counter);
                        item.appendChild(td);
                        index++;
                    });

                    break;

                case "admin":
                    this.item.innerHTML = `
                        <div class="itemFunc">
                            <h5>${this.dayName}</h5>
                        </div>
                        <div class="itemMenu">
                            <table>
                                <caption>Меню на день:</caption>
                                <tbody>
                                    <tr>
                                        <th>Продукт</th><th>Цена</th>
                                    </tr>
                                    ${this.table}
                                </tbody>
                            </table>
                        </div>
                    `;
                    itemState.classList.remove("editMenu", "futureMenu", "pastMenu");
                    break;
                default:
                    alert('ошибка :(');
            }
        }

        rewriteCurrentDayObject(mode) {
            let foodList = this.shadowRoot.querySelectorAll("tr");
            let index = 0;
            if (mode === "clear") {
                const foodList = Object.keys(this.currentDayObject.info);
                foodList.forEach((item) => {
                    const prevCount = this.currentDayObject.info[item].count;
                    const prevCost = this.currentDayObject.info[item].cost;
                    const safeCount = prevCount === 0 ? 1 : prevCount;
                    const newCost = prevCost / safeCount;
                    this.currentDayObject.info[item].count = 0;
                    this.currentDayObject.info[item].cost = newCost;
                });
                this.currentDayObject.price = 0;
            }
            else {
                foodList.forEach((item) => {
                    if (index !== 0) {
                        let foodName = item.getElementsByTagName("td")[0].innerText;
                        let count = item.getElementsByTagName("td")[2];
                        let neCount = count.getElementsByTagName("pie-counter")[0];
                        count = +neCount.getAttribute("count");
                        let cost = item.getElementsByTagName("td")[1];
                        cost = cost.getElementsByTagName("b")[0];
                        cost = +cost.innerText;
                        this.currentDayObject.info[foodName].count = count;
                        this.currentDayObject.info[foodName].cost = cost;

                    }
                    index++;
                });
                this.currentDayObject.price = +this.shadowRoot.getElementById('price').innerText;
            }
        }

        clearButtonFunction() {
            this.rewriteCurrentDayObject("clear");
            this.renderTable(this.dayName);
            this.setAttribute("data-state", "clear");

            queries.deleteOrder({
                username: userInfo.username,
                date: this.currentDayObject.date
            });
        }

        editButtonFunction() {
            this.setAttribute("data-state", "editMenu");
        }

        sendOrderFunction() {
            this.rewriteCurrentDayObject("other");
            this.renderTable(this.dayName);
            this.setAttribute("data-state", "futureMenu");
            const sendObject = {
                username: userInfo.username,
                date: this.currentDayObject.date,
                uploadOrder: {
                    info: this.currentDayObject.info
                }
            };
            console.log(sendObject);
            queries.setUserDayOrder(sendObject);
        }

        makeOrderFunction() {
            this.setAttribute("data-state", "editMenu");
        }
    }

    customElements.define('pie-menu-item', MenuItem);

})();
