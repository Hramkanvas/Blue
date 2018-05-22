import {templates} from "../templates/templates.js";

export let pieFooter = (function () {

    let template = templates.pieFooterTemplate;

    class FooterContent extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
        }
    }

    customElements.define('pie-footer', FooterContent);
})();

