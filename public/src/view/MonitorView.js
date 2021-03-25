import { _ } from "../util.js";
export default class MonitorView {
  constructor(model) {
    this.model = model;
    this.renderInitView();
    this.init();
  }

  init() {
    this.model.subscribe(this.renderMonitor.bind(this));
  }

  updateInputEvent(money) {
    this.model.updateTotalMoney(money); //notify함
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
    // const state = { action : "input", data : 4500} ->이런식으로 전달 받아야함
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
