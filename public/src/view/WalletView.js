import { _ } from "../util.js";
import { data } from "../data.js";

export default class WalletView {
  constructor(model) {
    this.init();
    this.model = model;
    this.$wallet = _.$(".wallet-view__cash-bundle");
  }
  init() {
    this.renderWalletView();
    //this.onEvent();
  }

  renderWalletView() {
    const $walletContainer = _.$(".wallet-view");
    const innerTemplate = this.makeWalletViewTemplate(data["money"]);
    const template = `<ul class="wallet-view__cash-bundle">${innerTemplate}</ul><div class="wallet-view__cash-bundle__total-price">23550</div>`;
    $walletContainer.innerHTML = template;
  }
  makeWalletViewTemplate(moneyList) {
    const money = moneyList;
    return money.reduce((acc, money) => {
      return (
        acc +
        `<li>
      <input
        type="button"
        value="${money["name"]}"
        class="wallet-view__cash-bundle__price"
      />
      <div class="wallet-view__cash-bundle__cnt">${money["count"]}개</div>
    </li>`
      );
    }, "");
  }

  drawCurrentWallet(event) {
    if (event.target.className !== "wallet-view__cash-bundle__price") return;
    const clickedMoney = event.target.value;
    this.model.updateMoney(clickedMoney);

    const totalMoney = this.model.calculateTotalMoney();
  }

  onEvent() {
    //버튼만 클릭되게 수정
    this.$wallet.addEventListener("click", this.drawCurrentWallet.bind(this));
  }
}
