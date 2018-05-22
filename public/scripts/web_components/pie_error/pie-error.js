import {templates} from "../templates/templates.js";
export let pieError = (function () {

    let templateT = templates.pieErrorTemplate;

    class ErrorClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = templateT;
            this.messageText = this.shadowRoot.getElementById('messageText');
            this.btCloseMessage = this.shadowRoot.getElementById('closeMessage');

            this.closeMessageEvent = this.closeMessageEvent.bind(this);
            this.messageText.textContent = "there is will be message";
        }

        set message(newValue) {
            this.messageText.textContent = newValue;
        }

        closeMessageEvent(event){
            this.parentNode.removeChild(this);
        }

        connectedCallback() {
            this.btCloseMessage.addEventListener('click', this.closeMessageEvent);
        }

        disconnectedCallback() {
            this.btCloseMessage.removeEventListener('click', this.closeMessageEvent);
        }
    }
    customElements.define('pie-error', ErrorClass);

    return {
        showError: function(message){
            let node = document.createElement("pie-error");
            node.message =  message;
            document.body.appendChild(node);
        }
    }
}());