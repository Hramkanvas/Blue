(function goooo() {

    let userInfo = {
        name: "Алексей",
        balance: 90
    }

    let template = `
        <style>
        
        a {
            text-decoration: none;
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

        <div class="logo">
            <img src="../img/logoExadel.png" alt="logoExadel">
        </div>

        <div class="userInfo">
            <span class="userInfoBalans">
                Баланс:
                <b>${userInfo.balance}</b> руб.
            </span>
            <span class="userInfoName">
                ${userInfo.name}
            </span>
            <span class="userInfoButton">
                <a href="#">Выход</a>
            </span>
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
            document.location.href = '../index.html'
        }

        disconnectedCallback() {
            this.exitButton.removeEventListener("click", this.out);
        }

    }

    customElements.define('header-content', HeaderContent);

})();

