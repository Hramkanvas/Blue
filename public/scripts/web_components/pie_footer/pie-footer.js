export let pieFooter = (function () {

    let template = `
        <style>
            .bottom-content {
                display: flex;
                flex-basis: 100%;
                //padding: 1px 0 1px 0;
                justify-content: center;
                background: #eaeaea;
            }
        </style>
        <div class = "bottom-content">
        <p>Exadel</p>
        </div>
    `;

    class FooterContent extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
        }
    }

    customElements.define('pie-footer', FooterContent);
})();

