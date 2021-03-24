import "../sass/main.scss";
import { _, delay } from "./util.js";
import WalletModel from "./model/WalletModel.js";
import MachineModel from "./Model/MachineModel.js";

import WalletView from "./view/WalletView.js";
import ProductView from "./view/ProductView.js";
import MonitorView from "./view/MonitorView.js";

const machineModel = new MachineModel();
const walletModel = new WalletModel();

const walletView = new WalletView(walletModel);
const monitorView = new MonitorView(machineModel);
const productView = new ProductView();
