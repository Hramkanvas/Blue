(function () {
    let userInfo = {
        type: 'user',
        username: 'username',
        balance: 35
    };
    let template = `
    <style>
        .hideBalanceField{
        display: none
        }
    </style>
    <header>
        <div class="logo">
            <img src="img/logoExadel.png" alt="logoExadel">
        </div>
        <div class="userInfo">
            <span class="userInfoBalance">
                Баланс: <b>${userInfo.balance}</b> руб.
            </span>
            <span class="userInfoName">
                ${userInfo.username}
            </span>
            <span class="userInfoButton">
                Выход
            </span>*/
        </div>
        
    </header>`;

    class HeaderClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({mode: 'open'}).innerHTML = template;
            this.$balanceField = this.shadowRoot.querySelector('.userInfoBalance');
        }

        connectedCallback() {
            if (userInfo.type === 'admin')
                this.$balanceField.className = 'hideBalanceField';
        }
    }
    customElements.define('pie-header', HeaderClass);
})();

