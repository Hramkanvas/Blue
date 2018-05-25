import {templates} from "../templates/templates.js";

export let pieTabs = (function () {
    let template = templates.pieTabsTemplate;

    class TabsClass extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }).innerHTML = template;
            this.upBalanceRef = this.shadowRoot.getElementById('upBalanceRef');
            this.ordersRef = this.shadowRoot.getElementById('ordersRef');
            this.menuRef = this.shadowRoot.getElementById('menuRef');
            this.pieMenuGeneral = this.shadowRoot.getElementById('pieMenuGeneral');
            this.pieUpBalance = this.shadowRoot.getElementById('pieUpBalance');
            this.pieStatisticsDay = this.shadowRoot.getElementById('pieStatisticsDay');

            this.activeTabName = this.menuRef;
            this.activeComponent = this.pieMenuGeneral;
        }

        connectedCallback() {
            this.upBalanceRef.addEventListener("click", (e) => { this.changeTab(e) });
            this.ordersRef.addEventListener("click", (e) => { this.changeTab(e) });
            this.menuRef.addEventListener("click", (e) => { this.changeTab(e) });
        }

        disconnectedCallback() {
            this.upBalanceRef.removeEventListener("click", this.changeTab);
            this.ordersRef.removeEventListener("click", this.changeTab);
            this.menuRef.removeEventListener("click", this.changeTab);
        }

        changeTab(e) {
            switch (e.target.id) {
                case "menuRef":
                    this.activeTabName.classList.remove("active");
                    this.menuRef.classList.add("active");
                    this.activeComponent.setAttribute("tabstate", "nonactiveTab");
                    this.pieMenuGeneral.setAttribute("tabstate", "activeTab");
                    this.activeTabName = this.menuRef;
                    this.activeComponent = this.pieMenuGeneral;
                    break;

                case "upBalanceRef":
                    this.activeTabName.classList.remove("active");
                    this.upBalanceRef.classList.add("active");
                    this.activeComponent.setAttribute("tabstate", "nonactiveTab");
                    this.pieUpBalance.setAttribute("tabstate", "activeTab");
                    this.activeTabName = this.upBalanceRef;
                    this.activeComponent = this.pieUpBalance;
                    break;

                case "ordersRef":
                    this.activeTabName.classList.remove("active");
                    this.ordersRef.classList.add("active");
                    this.activeComponent.setAttribute("tabstate", "nonactiveTab");
                    this.pieStatisticsDay.setAttribute("tabstate", "activeTab");
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
