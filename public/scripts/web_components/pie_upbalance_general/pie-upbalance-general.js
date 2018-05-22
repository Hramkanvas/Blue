import {templates} from "../templates/templates.js";

export let pieUpBalanceGeneralComponent = (function () {

    let template = templates.pieUpBalanceGeneralComponentTemplate;

    class UpBalanceGeneralClass extends HTMLElement {
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
                if (newValue === 'activeTab') {
                    this.tabContent.classList.add('active');
                }
                else {
                    this.tabContent.classList.remove('active');
                }
            }
        }
    }

    customElements.define('pie-upbalance-general', UpBalanceGeneralClass);
}());