import {templates} from "../templates/templates.js";

export let pieMenuGeneralComponent = (function () {

    let template = templates.pieMenuGeneralTemplate;

    class MenuGeneralClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.tabContent = this.shadowRoot.getElementById('menu');
        }

        static get observedAttributes() {
            return ['tabstate'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'tabstate') {
                this.tabContent.classList.toggle('active');
            }
        }
    }

    customElements.define('pie-menu-general', MenuGeneralClass);
}());