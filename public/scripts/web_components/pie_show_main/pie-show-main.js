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
        }

        makeOrder(e) {
            console.log(e.bubbles);
        }

        clickArrows(e) {
            this.info.setAttribute('week', e.detail.week);
            this.items.setAttribute('week', e.detail.week);
        }

        connectedCallback() {
            this.arrows.addEventListener('clickArrow', (e) => { this.clickArrows(e) });
            this.shadowRoot.addEventListener('makeOrderEvent', (e) => { (e) => { this.makeOrder(e) }} );
        }
    }

    customElements.define('pie-main-part', ShowMainPartClass);
}());