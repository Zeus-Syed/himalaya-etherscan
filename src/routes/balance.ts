require("dotenv/config");
import * as express from "express";
import { getBalanceAmount } from './../controller/balance';
let router = express.Router();

/**
 * router helps to fetch balance of a maximum 100 addresses
 */
router.route("/getAddressBalance").get(getBalanceAmount);

export default router;
