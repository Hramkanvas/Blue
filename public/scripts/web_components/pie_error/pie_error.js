
export let pieError = (function () {
    let templateT = `
        <style>
        #error{
            width:100%;
            height:100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index:9999;
            background-color: rgba(0,0,0,0.1);
        }
        #errorBlock{
            padding-top:5px;
            padding-bottom:10px;
            margin-top:30vh;
            margin-left:30vw;
            width:40vw;
            background-color:white;
        }

        #messageText{
            padding-left:10px;
            padding-right:10px;
            margin-bottom:10px;
            text-align:center;
        }

        button{
            display: flex;
            margin: 0 auto;
            border: none;
            color: white;
            font-size: 16px;
            outline: none;
            cursor: pointer;
            background: #3d8af7;
            padding: 5px 10px;
        }
        button:hover {
            background: #72bb53;
        }
        </style>
        <div id = "error">
           <div id = "errorBlock">
                <div id = "messageText">
                    Это текст для сообщения. АЛОАРВОАыватывло длыравлофа лд ыфраорфдл лодфырлыралы
                </div>
                <button id = "closeMessage" > OK </button>
           </div>    
        </div>
        `;

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
}());