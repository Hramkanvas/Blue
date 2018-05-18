import { menu } from '../pie_items/pie-items.js'
import {queries} from "../../queries.js";
export let pieMenuItem = (function () {
    let template = `

        <style>
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
                max-width: 95px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            b {
                color: var(--grey-black);
            }
            i:hover {
                cursor: pointer;
                color: black;
            }
            button {
                display: flex;
                margin: 0 auto;
                border: none;
                color: white;
                font-size: 16px;
                outline: none;
                cursor: pointer;
                background: #3d8af7;
                padding: 10px 20px;
            }
            .itemFunc {
                display: flex;
                padding-bottom: 15px;
                justify-content: space-between;
                align-items: center;
            }
            .itemFunc h5 {
                text-transform: capitalize;
                text-align: left;
                font-size: 30px;
                font-weight: 600;
                margin: 10px 20px;
            }
            .item {
                position: relative;
                top:0px;
                max-width: 450px;
                min-height: 400px;
                text-align: center;
                background: #f7f6f6;
                border-radius: var(--border-radius-component);
                border: var(--border-component);
                padding: 20px;
                box-shadow: 4px 6px 8px 0px #0000004a;
                transition: top 0.4s;
            }

            .item:active {
                top: -10px;
            }

            .item:hover {
                top: -10px;
            }
            .itemFuncButtons i {
                font-size: 27px;
                margin: 0px 2px;
            }
            .countProducts, .remove, .add {
                margin: 0px 5px;
            }
            .price {
                color: var(--grey-black);
                position: absolute;
                padding: 20px 0px;
                background: var(--white-grey);
                font-size: 20px;
                font-weight: bold;
                width: 100%;
                right: 0;
                bottom: 0;
            }
            .price.edit {
                bottom: 70px;
                padding: 10px 0px;
            }
            .orderButton {
                padding: 10px 20px;
                position: absolute;
                left: 50%;
                bottom: 5%;
                transform: translate(-50%);
            }
            .orderButton.edit {
                padding: 5px 10px;
            }
            .pastMenu {
                border-top: 3px solid black;
            }
            .editMenu {
                box-shadow: 4px 5px 6px 1px #1464f685;
                border-top: 3px solid #1464f6;
            }
            .editMenu td {
                padding-right: 20px;
            }
            .countProducts {
                display: flex;
            }
            .addMenu {
                position: absolute;
                top: 88%;
                width: 100%;
                left: 0;
            }
            button:hover {
                background: #72bb53;
            }
            .futureMenu {
                box-shadow: 4px 5px 6px 1px #72bb537a;
                border-top: 3px solid #72bb53;
            }
            .item caption {
                font-size: 15px;
            }
        </style>

        <div class="item">
                <div class="itemFunc">
                    <h5></h5>
                </div>

                <div class="itemMenu">
                    <table>
                        <caption>РњРµРЅСЋ РЅР° РґРµРЅСЊ:</caption>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
    `;

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
                return ['data-day', 'data-state'];
            }

            attributeChangedCallback(attrName, oldVal, newVal) {
                switch (attrName) {
                    case 'data-day':
                        return this.renderTable(newVal);

                    case 'data-state':
                        return this.itemState(newVal);

                }
            }

            renderTable(attr) {
                this.dayName = attr;
                this.day.innerHTML = `<h5>${attr}</h5>`;
                this.currentDayObject = menu.menuInfo[attr];
                let index = Object.keys(this.currentDayObject);
                this.rerenderTable(this.dayName);
            }

            rerenderTable(day) {
                let index = Object.keys(this.currentDayObject);
                this.table = ``;
                this.totalForDay = 0;
                for (let i = 0; i < index.length; i++) {
                    let food = Object.keys(this.currentDayObject);
                    let price = this.currentDayObject[food[i]].weight;
                    this.totalForDay += this.currentDayObject[food[i]].count === 0 ? 0 : price;
                    this.table += `<tr><td>${food[i]}</td><td><b>${price}</b> руб.</td></tr>`
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
                        let foodList = Object.keys(this.currentDayObject);
                        let trs = this.shadowRoot.querySelectorAll("tr~tr");
                        let index = 0;

                        trs.forEach(item => {
                            let td = document.createElement("td");
                            let counter = document.createElement("pie-counter");
                            const foodName = foodList[index];
                            counter.setAttribute("count", this.currentDayObject[foodName].count);
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

                    default:
                        alert('ошибка :(');
                }
            }

            rewriteCurrentDayObject(mode) {
                let foodList = this.shadowRoot.querySelectorAll("tr");
                let index = 0;
                if (mode === "clear") {
                    const foodList = Object.keys(this.currentDayObject);
                    foodList.forEach(function (item) {
                        const prevCount = this.currentDayObject[item].count;
                        const prevWeight = this.currentDayObject[item].weight;
                        const safeCount = prevCount === 0 ? 1 : prevCount;
                        const newWeight = prevWeight / safeCount;
                        this.currentDayObject[item].count = 0;
                        this.currentDayObject[item].weight = newWeight;
                    }.bind(this))
                }
                else {
                    foodList.forEach(function (item) {
                        if (index !== 0) {
                            let foodName = item.getElementsByTagName("td")[0].innerText;
                            let count = item.getElementsByTagName("td")[2];
                            let neCount = count.getElementsByTagName("pie-counter")[0];
                            count = +neCount.getAttribute("count");
                            let weight = item.getElementsByTagName("td")[1];
                            weight = weight.getElementsByTagName("b")[0];
                            weight = +weight.innerText;
                            this.currentDayObject[foodName].count = count;
                            this.currentDayObject[foodName].weight = weight;
                        }
                        index++;
                    }.bind(this));
                }
            }

            clearButtonFunction() {
                this.rewriteCurrentDayObject("clear");
                this.renderTable(this.dayName);
                this.setAttribute("data-state", "clear");
                queries.setUserDayOrder(this.currentDayObject);
            }

            editButtonFunction() {
                this.setAttribute("data-state", "editMenu");
            }

            sendOrderFunction() {
                this.rewriteCurrentDayObject("other");
                this.renderTable(this.dayName);
                this.setAttribute("data-state", "futureMenu");
            }

            makeOrderFunction() {
                this.setAttribute("data-state", "editMenu");
            }
        }

        customElements.define('pie-menu-item', MenuItem);

    })();
