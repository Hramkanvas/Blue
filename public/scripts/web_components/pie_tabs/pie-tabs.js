

export let pieTabs = (function () {
    let template = `
		<style>
p {
    font-size: 16px;
}

h1, h2, h3, h4, h5, h6, th {
    color: grey
}

a {
color: var(--grey-dark);
text-decoration: none;
}

.tabMenu {
    font-size: 24px;
    text-align: center;
    background-color: #d6d6d6;
    border-radius: var(--border-radius-component);
    border: var(--border-component);
    display: grid;
    margin: 25px 0px;
    padding: 25px 0px;
    grid-template-columns: 33% 33% 33%
}

.tabMenuItem.active {
    color: #3d8af7;
}

body {
    display: flex;
    width: 100%;
    margin: 0 auto;
    min-width: 320px;
    flex-direction: column;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: #7a7a7a;
}

</style>

<div class="tabMenu">
    <div><a href="#" id="menuRef"        class="tabMenuItem active">Меню</a> </div>
    <div><a href="#" id="upBalanceRef"   class="tabMenuItem">Пополнить баланс</a> </div>
    <div><a href="#" id="ordersRef"      class="tabMenuItem">Заказы</a> </div>
</div>
<pie-menu-general tabState="activeTab" id="pieMenuGeneral"></pie-menu-general>
<pie-upbalance-general tabState="nonactiveTab" id="pieUpBalance"></pie-upbalance-general>
<pie-orders-general tabState="nonactiveTab" id="pieStatisticsDay"></pie-orders-general>
`;

class TabsClass extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).innerHTML = template;
        this.upBalanceRef = this.shadowRoot.getElementById('upBalanceRef');
        this.ordersRef = this.shadowRoot.getElementById('ordersRef');
        this.menuRef = this.shadowRoot.getElementById('menuRef');
        this.pieMenuGeneral = this.shadowRoot.getElementById('pieMenuGeneral');
        this.pieUpBalance = this.shadowRoot.getElementById('pieUpBalance');
        this.pieStatisticsDay = this.shadowRoot.getElementById('pieStatisticsDay');
        this.changeTab = this.changeTab.bind(this);
        this.activeTabName = this.menuRef;
        this.activeComponent = this.pieMenuGeneral;
    }

    connectedCallback() {
        this.upBalanceRef.addEventListener("click", this.changeTab);
        this.ordersRef.addEventListener("click", this.changeTab);
        this.menuRef.addEventListener("click", this.changeTab);
    }

    disconnectedCallback() {
        this.upBalanceRef.removeEventListener("click", this.changeTab);
        this.ordersRef.removeEventListener("click", this.changeTab);
        this.menuRef.removeEventListener("click", this.changeTab);
    }

    changeTab(event) {
        switch (event.target.id) {
            case "menuRef":
                this.activeTabName.classList.remove("active");
                this.menuRef.classList.add("active");
                this.activeComponent.setAttribute("tabState","nonactiveTab");
                this.pieMenuGeneral.setAttribute("tabState","activeTab");
                this.activeTabName = this.menuRef;
                this.activeComponent = this.pieMenuGeneral;
                break;

            case "upBalanceRef":
                this.activeTabName.classList.remove("active");
                this.upBalanceRef.classList.add("active");
                this.activeComponent.setAttribute("tabState","nonactiveTab");
                this.pieUpBalance.setAttribute("tabState","activeTab");
                this.activeTabName = this.upBalanceRef;
                this.activeComponent = this.pieUpBalance;
                break;

            case "ordersRef":
                this.activeTabName.classList.remove("active");
                this.ordersRef.classList.add("active");
                this.activeComponent.setAttribute("tabState","nonactiveTab");
                this.pieStatisticsDay.setAttribute("tabState","activeTab");
                this.activeTabName = this.ordersRef;
                this.activeComponent = this.pieStatisticsDay;
                break;

            default:
                alert('error');

        }
    }
}
customElements.define('pie-tabs', TabsClass);
}());
