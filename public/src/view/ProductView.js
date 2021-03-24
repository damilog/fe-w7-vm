import { _ } from "../util.js";
import { data } from "../data.js";
export default class ProductView {
  constructor() {
    this.init();
  }

  renderProductView() {
    const $productContainer = _.$(".product-view");
    const innerTemplate = this.makeProductViewTemplate(data["product"]);
    const template = `<ul class="product-view__drink-bundle">${innerTemplate}</ul>`;
    $productContainer.innerHTML = template;
  }

  makeProductViewTemplate(productList) {
    const product = productList;
    return product.reduce((acc, product) => {
      return (
        acc +
        `<li class="product-view__drink-bundle__list">
      <span class="product-view__drink-bundle__list__name">${product["name"]}</span>
      <span class="product-view__drink-bundle__list__price">${product["price"]}원</span>
    </li>`
      );
    }, "");
  }

  init() {
    this.renderProductView();
  }
}
