export let pieFooterContent = (function () {

    let template = `
        <style>
            bottom-content {
                display: flex;
                flex-basis: 100%;
                padding: 20px 0 20px 0;
                justify-content: center;
                background: #eaeaea;
            }
        </style>

        <p>Exadel</p>
    `;

    class FooterContent extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
        }
    }

    customElements.define('bottom-content', FooterContent);

})();

