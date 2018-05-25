import { queries } from "../../queries.js";
import {templates} from "../templates/templates.js";
export let pieMakeOrder = (function () {

    let template = templates.pieMakeOrderTemplate;

    class MakeOrder extends HTMLElement {
        constructor() {
            super();
            queries.isMakingOrdersForToday().then(orderIsMaking => {
                if (orderIsMaking === true) {
                    this.attachShadow({ mode: 'open' }).innerHTML = template;
                    this.btMakeOrder = this.shadowRoot.getElementById("btMakeOrder");
                    this.btMakeOrder.addEventListener("click", (e) => { this.makeOrderClick() });
                }
            })
            .catch(error => {
                console.log(error)
            });
        }

        makeOrderClick() {
            queries.confirmDayOrder().then(ok => {
                console.log("OK");
            })
            .catch(error => {
                console.log(error)
            });
        }

        disconnectedCallback() {
            this.btMakeOrder.removeEventListener("click", this.makeOrderClick);
        }
    }

    customElements.define('pie-make-order', MakeOrder);
}());