import { _ } from "../util.js";

export default class MonitorView {
  constructor() {
    this.init();
  }

  updateInputMoney(money) {
    const $inputMoney = _.$(".monitor-view__money");
    $inputMoney.textContent = `${money} 원`;
  }

  disableReturnBtn() {
    const $returnBtn = _.$(".monitor-view__btn");
    $returnBtn.disabled = true;
  }

  ableReturnBtn() {
    const $returnBtn = _.$(".monitor-view__btn");
    $returnBtn.disabled = false;
  }

  updateMonitor(text) {
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

  init() {
    this.renderInitView();
    this.updateMonitor(this.printInputMoney(500));
    this.updateMonitor(this.printInputMoney(500));
    this.updateInputMoney(33);
  }
}
