export let pieHeaderContent = (function () {

    let userInfo =  JSON.parse(localStorage.getItem("user"));

    let template = `
        <style>
     
        a {
            text-decoration: none;
        }
        
        .header-content {
            position: relative;
            top: 0px;
            display: flex;
            background-color: var(--white-grey);
            z-index: 2;
            align-items: center;
            justify-content: space-around;
            color: var(--grey-dark);
            box-shadow: rgba(165, 164, 164, 0.45) 0px 4px 8px;
            padding: 10px 0px;
        }

        .logo {
            padding: 0px 5px;
            width: 150px;
            margin-right: auto;
            margin-left: 50px;
        }

        .logo img {
            width: 100%;
        }

        .userInfo {
            font-size: 25px;
        }

        .userInfo span {
            margin: 0px 20px;
        }

        .userInfoName {
            padding-right: 120px;
        }

        .userInfoButton {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;    
            padding: 0px 15px;
            background: #d6d6d6;
            display: flex;
            margin-right: 0px !important;
            cursor: pointer;
            align-items: center;
        }

        </style>
        <div class="header-content">
            <div class="logo">
                <img src="img/logoExadel.png" alt="logoExadel">
            </div>
            <div class="userInfo">
                <!--span class="userInfoBalans">
                    Баланс:
                    <b>${userInfo.balance}</b> руб.
                </span-->
                <span class="userInfoName">
                    ${userInfo.FIO}
                </span>
                <span class="userInfoButton">
                    <a>Выход</a>
                </span>
            </div>
        </div>
    `;

    class HeaderContent extends HTMLElement {

        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.exitButton = this.shadowRoot.querySelector("span.userInfoButton");
            this.out = this.out.bind(this);
        }

        connectedCallback() {
            this.exitButton.addEventListener("click", this.out);
        }

        out() {
            window.location.assign("./index.html");
        }

        disconnectedCallback() {
            this.exitButton.removeEventListener("click", this.out);
        }

    }

    customElements.define('pie-header-content', HeaderContent);

})();

