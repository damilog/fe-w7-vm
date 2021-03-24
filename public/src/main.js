import "../sass/main.scss";
import { _, delay } from "./util.js";
import WalletModel from "./model/WalletModel.js";
import WalletView from "./view/WalletView.js";
import ProductView from "./view/ProductView.js";
import MonitorView from "./view/MonitorView.js";

const walletModel = new WalletModel();
const walletView = new WalletView(walletModel);
const productView = new ProductView();
const monitorView = new MonitorView();
