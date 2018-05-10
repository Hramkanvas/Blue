export let testGeneralComponent = (function () {
    let templateT = `
        <style>
        .generalComponent{
            border: #4c94f8;
            display:flex;
            flex-direction: column;
            height: 200px;
            position: relative;
            background-color: #1464f6;
            width: 100px;
        }
        
        button{
            margin-top: 10%;
            border: #444444;
            height: 30px;
            position: relative;
            background-color: #7a7a7a;
            width: 100%;
        }
        </style>
        <div class="generalComponent">
            <button id="buttonTest">CLick</button>
            <test-inside-component clicked="flag" id="insideComp"></test-inside-component>
        </div>
        `;

    class AuthorizationClass extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = templateT;
            this.buttonTest = this.shadowRoot.getElementById('buttonTest');
            this.clickFunc = this.clickFunc.bind(this);
            this.insideComponent = this.shadowRoot.getElementById('insideComp');
            this.lol = this.lol.bind(this);
            this.insideComponent.addEventListener("helloWorld", this.lol);
        }

        lol(e) {
            this.buttonTest.textContent = e.detail.text();
        }

        clickFunc(event) {
            if (this.insideComponent.getAttribute('clicked') == 'flag') {
                this.insideComponent.setAttribute('clicked', 'unflag');
            }
            else {
                this.insideComponent.setAttribute('clicked', 'flag');
            }
        }

        connectedCallback() {
            this.buttonTest.addEventListener("click", this.clickFunc)
        }

        disconnectedCallback() {
            this.buttonTest.removeEventListener("click", this.clickFunc);
        }
    }
    customElements.define('test-general-component', AuthorizationClass);
})();