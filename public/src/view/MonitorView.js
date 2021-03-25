import { _ } from "../util.js";

export default class MonitorView {
  constructor(model, walletModel) {
    this.model = model;
    this.walletModel = walletModel;
    this.renderInitView();
    this.init();
  }

  init() {
    this.walletModel.subscribe(this.updateInputEvent.bind(this));
    this.model.subscribe(this.renderMonitor.bind(this)); //전달 받은 상태에 맞는 문구를 모니터에 보여줌
    // this.model.subscribe(
    //   this.productView.paintSelectable.bind(this.productView)
    // ); //선택할 수 있는 상품을 색칠함
  }

  updateInputEvent(money) {
    this.model.updateTotalMoney(money); //notify
    this.renderInputMoney();
  }

  renderInputMoney() {
    const totalInputMoney = this.model.getTotalInputMoney();
    const $inputMoney = _.$(".monitor-view__money");
    $inputMoney.innerText = `${totalInputMoney} 원`;
  }

  disableReturnBtn() {
    const $returnBtn = _.$(".monitor-view__btn");
    $returnBtn.disabled = true;
  }

  ableReturnBtn() {
    const $returnBtn = _.$(".monitor-view__btn");
    $returnBtn.disabled = false;
  }

  renderMonitor({ action, data }) {
    let text;
    switch (action) {
      case "input":
        text = this.printInputMoney(data);
        break;
      case "select":
        text = this.printSelectedProduct(data);
        break;
      case "return":
        text = this.printReturnMoney(data);
        break;
      case "overBudget":
        test = this.printOverBudgetError(data);
        break;
      default:
        console.log(Error(`${action}은 처리 불가합니다.`));
    }

    const $monitor = _.$(".monitor-view__monitor");
    _.insert($monitor, "beforeend", text);
  }

  printOverBudgetError(money) {
    return `<div class= "monitor-view__monitor__text">현재 투입 금액(${money})로 구매 불가</div>`;
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
