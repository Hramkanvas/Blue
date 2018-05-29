import {templates} from "../templates/templates.js";

export let pieShowMainPart = (function () {
    let template = templates.pieShowMainPartTemplate;

    class ShowMainPartClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.arrows = this.shadowRoot.getElementById("arrows");
            this.info = this.shadowRoot.getElementById("info");
            this.clickArrows = this.clickArrows.bind(this);
            this.items = this.shadowRoot.getElementById("items");
            this.makeOrder = this.makeOrder.bind(this);
            this.week = 1;
        }

        makeOrder(e) {
            this.info.setAttribute('week', this.week);
        }

        clickArrows(e) {
            this.week = e.detail.week;
            this.info.setAttribute('week', e.detail.week);
            this.items.setAttribute('week', e.detail.week);
        }

        connectedCallback() {
            this.arrows.addEventListener('clickArrow', (e) => { this.clickArrows(e) });
            this.items.addEventListener('makeOrder', this.makeOrder);
        }
    }

    customElements.define('pie-main-part', ShowMainPartClass);
}());