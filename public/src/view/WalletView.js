import { _ } from "../util.js";

export default class WalletView {
  constructor(model, monitorView) {
    this.model = model;
    this.monitorView = monitorView; //?? 말도 안되는 상황
    this.renderInitView();
    this.$wallet = _.$(".wallet-view__cash-bundle");
    this.init();
  }
  init() {
    this.onEvent();
    this.model.subscribe(this.renderCurrentWallet.bind(this));
    this.model.subscribe(
      this.monitorView.updateInputEvent.bind(this.monitorView)
    );
    // ✅잔여 동전 없으면 클릭 못 하도록 수정 필요
  }

  renderInitView() {
    const $walletContainer = _.$(".wallet-view");
    const moneyData = this.model.getMoneyState();
    const innerTemplate = this.makeTemplate(moneyData);
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
  updateWallet(event) {
    if (event.target.className !== "wallet-view__cash-bundle__price") return;
    const clickedMoney = Number(event.target.value);
    this.model.updateMoney(clickedMoney);
  }

  renderTotalPrice() {
    const cashTotalPrice = _.$(".wallet-view__cash-bundle__total-price");
    cashTotalPrice.innerText = this.model.calculateTotalMoney();
  }

  renderCurrentWallet(clickedMoney) {
    const $clickedMoneyCount = _.$(`#cnt-${clickedMoney}`);
    const clickedMoneyCount = this.model.getMoneyCount(clickedMoney);
    $clickedMoneyCount.innerText = `${clickedMoneyCount}개`;
    this.renderTotalPrice();
  }

  onEvent() {
    //버튼만 클릭되게 수정
    this.$wallet.addEventListener("click", this.updateWallet.bind(this));
  }
}
