import { queries } from "../../queries.js";

export var menu = undefined;
export var orders = undefined;
import { templates } from "../templates/templates.js";

export let pieItems = (function () {

    let userInfo = JSON.parse(localStorage.getItem("user"));
    let template1 = templates.pieItemsTemplate;

    class Items extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({ mode: 'open' }).innerHTML = template1;
            this.addItems = this.addItems.bind(this);
            this.place = this.shadowRoot.querySelector(".items");
            this.waitComponent = this.shadowRoot.getElementById("waiting");
            this.loadOrders = this.loadOrders.bind(this);
            this.makeOrder = this.makeOrder.bind(this);
        }

        makeOrder(e){
            const event = new CustomEvent('makeOrder', { 'bubbles': true});
            this.dispatchEvent(event);
        }

        static get observedAttributes() {
            return ['week'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.week = newValue;
            this.place.innerHTML = "";
            this.loadOrders();
        }

        loadOrders() {
            this.menu = undefined;
            if (userInfo.type === 'admin') {
                queries.getMenu(this.week).then(res => {
                    if (this.waitComponent !== null) {
                        this.waitComponent.remove();
                    }
                    menu = res;
                    this.addItems(menu);
                });
            } else {
                queries.getMainPageUser(userInfo.username, this.week).then(res => {
                    if (this.waitComponent !== null) {
                        this.waitComponent.remove();
                    }
                    menu = res[1];
                    orders = res[0];
                    this.addItems(menu, orders);
                });
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

        addItems(menu, orders) {
            if (orders) {
                const dayNamesList = Object.keys(menu.menuInfo);
                let index = 0;
                dayNamesList.forEach((dayName) => {
                    if (dayName !== "особое") {
                        const dayNameInt = this.dayNameToNum(dayName);
                        const order = orders.find((element) => {
                            return (new Date(element.date)).getDay() === dayNameInt
                        });
                        let item = document.createElement('pie-menu-item');
                        item.setAttribute("data-holder", "user");
                        order.info = order.info || undefined;
                        if (order.info) {
                            item.setAttribute("data-day", dayName);
                            if (order.isBlocked) {
                                item.setAttribute("data-state", "pastMenu");
                            }
                            else {
                                item.setAttribute("data-state", "futureMenu");
                            }
                            index++;
                        }
                        else {
                            order.price = 0
                            order.info = {};
                            let foodList = Object.keys(menu.menuInfo[dayName]);
                            foodList.forEach(foodName => {
                                order.info[foodName] = {
                                    cost: menu.menuInfo[dayName][foodName].price,
                                    count: 0
                                }
                            });
                            item.setAttribute("data-day", dayName);
                            if (order.isBlocked) {
                                item.setAttribute("data-state", "pastMenu");
                            }
                            else {
                                item.setAttribute("data-state", "clear");
                            }
                        }
                        item.addEventListener('makeOrderEvent', this.makeOrder);
                        this.place.appendChild(item);
                    }
                });
            } else {
                for (let day in menu.menuInfo) {
                    if(day !== "особое"){
                        let item = document.createElement('pie-menu-item');
                        item.setAttribute("data-holder", "admin");
                        item.setAttribute("data-day", day);
                        if (userInfo.type === 'admin') {
                            item.setAttribute("data-state", "admin");
                        } else {
                            item.setAttribute("data-state", "clear");
                        }
                        
                        this.place.appendChild(item);
                        item.addEventListener('makeOrderEvent', this.makeOrder);
                        this.place.appendChild(item);
                    }
                }
            }
        }
    }

    customElements.define('pie-items', Items);

})();