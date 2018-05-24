import {templates} from "../templates/templates.js";

export let pieWaiting = (function () {


    class WaitingClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = templates.pieWaitingTemplate;
        }
    }

    customElements.define('pie-wait', WaitingClass);
})();