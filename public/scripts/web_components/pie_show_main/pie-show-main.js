import {templates} from "../templates/templates.js";

export let pieShowMainPart = (function () {
    let template = templates.pieShowMainPartTemplate;

    class ShowMainPartClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.arrows = this.shadowRoot.getElementById("arrows");
            this.info = this.shadowRoot.getElementById("info");
        }

        clickArrows(e) {
            this.info.setAttribute('week', e.detail.week);
        }

        connectedCallback() {
            this.arrows.addEventListener('clickArrow', (e) => { this.clickArrows(e) });
        }
    }

    customElements.define('pie-main-part', ShowMainPartClass);
}());