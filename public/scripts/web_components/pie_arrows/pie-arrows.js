export let pieArrows = (function () {

    let template = `
        <link rel="stylesheet" type="text/css" href="../../styles/font-awesome.css">

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
            this.week = 1;
            this.leftArrow = this.shadowRoot.getElementById('leftArrow');
            this.rightArrow = this.shadowRoot.getElementById('rightArrow');
            this.clickLeft = this.clickLeft.bind(this);
            this.clickRight = this.clickRight.bind(this);
            this.changeWeek = this.changeWeek.bind(this);
        }

        changeWeek(){
            const event = new CustomEvent('clickArrow', {
                detail: {
                    week : this.week
                }
              });
            this.dispatchEvent(event);
        }

        clickRight() {
            if (this.week === 0){
                this.leftArrow.style.visibility = 'visible';
            }
            this.week++;
            if (this.week === 2){
                this.rightArrow.style.visibility = 'hidden';
            }
            this.changeWeek();
        }

        clickLeft(){
            if (this.week === 2){
                this.rightArrow.style.visibility = 'visible';
            }
            this.week--;
            if (this.week === 0){
                this.leftArrow.style.visibility = 'hidden';
            }
            this.changeWeek();
        }

        connectedCallback() {
            this.leftArrow.addEventListener('click', this.clickLeft);
            this.rightArrow.addEventListener('click', this.clickRight);
        }
    }

    customElements.define('pie-arrows', Arrows);

})();