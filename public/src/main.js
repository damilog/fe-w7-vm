import "../sass/main.scss";
import { _ } from "./util.js";
import WalletModel from "./model/WalletModel.js";
import MachineModel from "./model/MachineModel.js";

import WalletView from "./view/WalletView.js";
import ProductView from "./view/ProductView.js";
import MonitorView from "./view/MonitorView.js";

const walletModel = new WalletModel();
const machineModel = new MachineModel();

const productView = new ProductView(machineModel);
const monitorView = new MonitorView(machineModel, walletModel);
const walletView = new WalletView(walletModel, machineModel);
