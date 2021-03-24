import { _ } from "../util.js";
import { data } from "../data.js";

export default class WalletView {
  constructor(model) {
    this.model = model;
    this.renderInitView();
    this.$wallet = _.$(".wallet-view__cash-bundle");
    this.init();
  }
  init() {
    this.onEvent();
  }

  renderInitView() {
    const $walletContainer = _.$(".wallet-view");
    const innerTemplate = this.makeTemplate(data["money"]);
    const totalMoney = this.model.calculateTotalMoney(); //총합을 가져옴
    const template = `<ul class="wallet-view__cash-bundle">${innerTemplate}</ul><div class="wallet-view__cash-bundle__total-price">${totalMoney}</div>`;
    $walletContainer.innerHTML = template;
  }

  makeTemplate(moneyList) {
    const money = moneyList;
    return money.reduce((acc, money) => {
      return (
        acc +
        `<li>
      <input
        type="button"
        value="${money["name"]}"
        class="wallet-view__cash-bundle__price"
        id="money-${money["name"]}"
      />
      <div class="wallet-view__cash-bundle__cnt" id="cnt-${money["name"]}">${money["count"]}개</div>
    </li>`
      );
    }, "");
  }

  drawCurrentWallet(event) {
    if (event.target.className !== "wallet-view__cash-bundle__price") return;
    const clickedMoney = event.target.value;
    this.model.updateMoney(clickedMoney); //상태 변경
    const clickedMoneyCount = _.$(`#cnt-${event.target.value}`);
    clickedMoneyCount.innerText = this.model.getMoneyCount(clickedMoney);
  }
  findSelectedMoney() {}

  onEvent() {
    //버튼만 클릭되게 수정
    this.$wallet.addEventListener("click", this.drawCurrentWallet.bind(this));
  }
}
