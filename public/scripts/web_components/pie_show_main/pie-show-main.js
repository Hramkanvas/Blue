import {templates} from "../templates/templates.js";

export let pieShowMainPart = (function () {
    let template = templates.pieShowMainPartTemplate;

    class ShowMainPartClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;

            this.arrows = this.shadowRoot.getElementById("arrows");
            this.info = this.shadowRoot.getElementById("info");
            this.clickArrows = this.clickArrows.bind(this);
        }

        clickArrows(e) {
            this.info.setAttribute('week', e.detail.week);
        }

        connectedCallback() {
            this.arrows.addEventListener('clickArrow', this.clickArrows);
        }
    }

    customElements.define('pie-main-part', ShowMainPartClass);
}());