import { _ } from "../util.js";

export default class MonitorView {
  constructor(model, productView, walletModel) {
    this.model = model;
    this.productView = productView;
    this.walletModel = walletModel;
    this.disabled = "";
    this.renderInitView();
    this.init();
  }

  init() {
    this.model.subscribe(this.renderMonitor.bind(this)); 
    this.model.subscribe(
      this.productView.paintSelectable.bind(this.productView)
    );
      this.ableReturnBtn();
  }

  updateInputEvent({state,money}) { //wallet에서 구독중
    //상태를 받아서 그 상태가 return 이면 update는 안하게 
    if(state === "input"){
      this.model.updateTotalMoney(money); //notify
      this.renderInputMoney();
    }else if(state = "return"){
      this.renderInputMoney();
    }
  }

  renderInputMoney() {
    const totalInputMoney = this.model.getTotalInputMoney();
    const $inputMoney = _.$(".monitor-view__money");
    $inputMoney.innerText = `${totalInputMoney} 원`;
  }

  disableReturnBtn() {
    console.log('aa')
    const $returnBtn = _.$(".monitor-view__btn");
    this.disabled = "true";
    $returnBtn.disabled = "disabled";
    // this.isDisable($returnBtn);
  }

  isDisable() {
    return this.disabled;
  }

  ableReturnBtn() {
    const $returnBtn = _.$(".monitor-view__btn");
    $returnBtn.disabled = false;
    this.onEvent($returnBtn);
  }

  updateWallet() {
    // const totalInputMoney = this.model.getTotalInputMoney();
    // // console.log(totalInputMoney)
    this.walletModel.returnTotalMoney(this.model.returnTotalDetail());
    this.model.resetTotalMoney();
    this.renderInputMoney();
    this.disableReturnBtn();

  }

  onEvent($returnBtn) {
    $returnBtn.addEventListener("click", this.updateWallet.bind(this));
  }

  renderMonitor({ action, data }) {
    let text;
    switch (action) {
      case "input":
        text = this.printInputMoney(data);
        break;
      case "select":
        text = this.printSelectedMoney(data);
        break;
      case "return":
        text = this.printReturnMoney(data);
        break;
      default:
        console.log(Error(`${action}은 처리 불가합니다.`));
    }

    const $monitor = _.$(".monitor-view__monitor");
    _.insert($monitor, "beforeend", text);
  }

  printInputMoney(money) {
    return `<div class= "monitor-view__monitor__text">${money}원이 투입됐음.</div>`;
  }

  printSelectedProduct(product) {
    return `<div class= "monitor-view__monitor__text">${product}가 선택 됨.</div>`;
  }

  printReturnMoney(money) {
    return `<div class= "monitor-view__monitor__text">잔돈 ${money}원 반환</div>`;
  }

  renderInitView() {
    const $monitorContainer = _.$(".monitor-view");
    const template = `<div class="monitor-view__money"></div>
    <input
      type="button"
      class="monitor-view__btn"
      value="반환"
      disabled
    />
    <div class="monitor-view__monitor"></div>`;
    $monitorContainer.innerHTML = template;
  }
}