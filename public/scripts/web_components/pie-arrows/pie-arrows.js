export let pieArrows = (function () {

    let template = `
        <link rel="stylesheet" type="text/css" href="../styles/font-awesome.css">

        <style>
            
            i:hover {
                cursor: pointer;
                color: black
            }

            .items {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                grid-gap: 50px 30px;
            }

            .leftArrow, .rightArrow {
                position: fixed;
                top: 50%;
                font-size: 40px;
                color: #d6d6d6;
            }
            
            .leftArrow i, .rightArrow i {
                padding: 15px;
            }

            .leftArrow {
                left: 2%;
            }

            .rightArrow {
                right: 2%;
            }

        </style>

        <div class="items">
            
            <div class="leftArrow" id="leftArrow">
                <span>
                    <i class="fa fa-arrow-left"></i>
                </span>
            </div>

            <div class="rightArrow" id="rightArrow">
                <span>
                    <i class="fa fa-arrow-right"></i>
                </span>
            </div>

            <div>
                <menu-item></menu-item>
            </div>

        </div>
    `;

    class Arrows extends HTMLElement {
        
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.console = this.console.bind(this); 
            this.leftArrow = this.shadowRoot.getElementById("leftArrow");
            this.rightArrow = this.shadowRoot.getElementById("rightArrow");
        }

        connectedCallback() {
            this.leftArrow.addEventListener("click", this.console);
            this.rightArrow.addEventListener("click", this.console);
        }

        console(e) {
            console.log(e.path[2].id)
        }

    }

    customElements.define('menu-arrows', Arrows);

})();