import { _ } from "../util.js";
import { data } from "../data.js";
import MonitorView from "./MonitorView.js"; //wallet click 구독
import MachineModel from "../Model/MachineModel.js"; //wallet click 구독
export default class WalletView {
  constructor(model) {
    this.model = model;
    this.monitorView = new MonitorView(); //wallet click 구독
    this.machineModel = new MachineModel(); //wallet click 구독
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

  updateWallet(event) {
    if (event.target.className !== "wallet-view__cash-bundle__price") return;
    const clickedMoney = Number(event.target.value);
    this.model.updateMoney(clickedMoney); //wallet click 구독
    this.drawCurrentWallet(clickedMoney); //wallet click 구독
    this.drawTotalPrice();

    const template = this.monitorView.printInputMoney(clickedMoney); //wallet click 구독
    this.monitorView.updateMonitor(template); //wallet click 구독

    this.machineModel.updateTotalMoney(clickedMoney); //wallet click 구독
    // this.monitorView.renderInputMoney();
    //---------this.monitorView.renderInputMoney()와 동일⬇️-------------------------
    const totalInputMoney = this.machineModel.getTotalInputMoney();
    const $inputMoney = _.$(".monitor-view__money");
    console.log(this.machineModel.getTotalInputMoney());
    $inputMoney.innerText = `${totalInputMoney} 원`;
    //----------------------------------------------------------
  }
  drawTotalPrice() {
    const cashTotalPrice = _.$(".wallet-view__cash-bundle__total-price");
    cashTotalPrice.innerText = this.model.calculateTotalMoney();
  }

  drawCurrentWallet(clickedMoney) {
    const $clickedMoneyCount = _.$(`#cnt-${clickedMoney}`);
    const clickedMoneyCount = this.model.getMoneyCount(clickedMoney);
    $clickedMoneyCount.innerText = `${clickedMoneyCount}개`;
  }

  onEvent() {
    //버튼만 클릭되게 수정
    this.$wallet.addEventListener("click", this.updateWallet.bind(this));
  }
}
