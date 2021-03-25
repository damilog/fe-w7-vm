import "../sass/main.scss";
import { _, delay } from "./util.js";
import WalletModel from "./model/WalletModel.js";
import MachineModel from "./model/MachineModel.js";

import WalletView from "./view/WalletView.js";
import ProductView from "./view/ProductView.js";
//import MonitorView from "./view/MonitorView.js";
import ProgressView from "./view/ProgressView.js";

const walletModel = new WalletModel();
const machineModel = new MachineModel();

const productView = new ProductView(machineModel);
const progressView = new ProgressView(machineModel);
const walletView = new WalletView(walletModel, progressView);
//const monitorView = new MonitorView(machineModel); //machinemodel 이 undefined로 읽혀져서 (빌드 오류 같음) Progress로 다시 만들음
