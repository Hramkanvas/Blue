import {queries} from "../../queries.js";

export var menu = undefined;
export var orders = undefined;
import {templates} from "../templates/templates.js";

export let pieItems = (function () {

    let userInfo = JSON.parse(localStorage.getItem("user"));
    let template1 = templates.pieItemsTemplate;

    class Items extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template1;
            this.addItems = this.addItems.bind(this);
            this.place = this.shadowRoot.querySelector(".items");
            this.waitComponent = this.shadowRoot.getElementById("waiting");
        }

        connectedCallback() {
            this.menu = undefined;
            if (userInfo.type === 'admin') {
                queries.getMenu(1).then(res => {
                    menu = res;
                    this.addItems(menu);
                });
            } else {
                queries.getMainPageUser(userInfo.username, 1).then(res => {
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
            if (this.waitComponent){
                this.waitComponent.parentNode.removeChild(this.waitComponent);
            }
            if (orders) {
                const dayNamesList = Object.keys(menu.menuInfo);
                let index = 0;
                dayNamesList.forEach((dayName) => {
                    const dayNameInt = this.dayNameToNum(dayName);
                    const order = orders.find((element) => {
                        return (new Date(element.date)).getDay() === dayNameInt
                    });
                    let item = document.createElement('pie-menu-item');
                    item.setAttribute("data-holder", "user");
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
                        foodList.forEach(foodName=>{
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
                    this.place.appendChild(item);
                });
            } else {
                for (let day in menu.menuInfo) {
                    let item = document.createElement('pie-menu-item');
                    item.setAttribute("data-holder", "admin");
                    item.setAttribute("data-day", day);
                    if (userInfo.type === 'admin') {
                        item.setAttribute("data-state", "admin");
                    } else {
                        item.setAttribute("data-state", "clear");
                    }

                    this.place.appendChild(item);
                }
            }
        }
    }

    customElements.define('pie-items', Items);

})();