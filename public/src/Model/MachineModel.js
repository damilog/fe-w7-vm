import { _ } from "../util.js";
import Observable from "../Observable.js";

export default class MachineModel extends Observable {
  constructor() {
    super();
    this.init();
  }
  init() {}
}
