import {
  defaultAddressArray,
  responseBuilder,
  weiConverterToEther,
} from "../utils/utils";
import { API, APIKEY, MAXCALLS } from "./../config/index";
const axios = require("axios");

/**
 * formats data returned from etherscan
 * @param balanceResponse obj[]
 * @returns
 */
const formatBalanceResponse = (balanceResponse) => {
  let totalBalance: number = 0;
  let formattedBalance = balanceResponse.map((balance) => {
    totalBalance += parseFloat(weiConverterToEther(balance.balance));
    return {
      address: balance.account,
      balance: parseFloat(weiConverterToEther(balance.balance)),
    };
  });
  return { addresses: formattedBalance, balance: totalBalance };
};

/**
 * get balance controller
 * @param req
 * @param res
 */
export const getBalanceAmount = async (req, res) => {
  try {
    let addresses: string[];
    if (req.query.addresses) {
      console.debug("request address is considered");
      addresses = req.query.addresses.split(",");
    } else {
      console.debug("default address is considered");
      addresses = defaultAddressArray;
    }

    const action: string = "balancemulti";
    const url = `${API}api?module=account&action=${action}&address=${addresses.toString()}&tag=latest&offset=${MAXCALLS}apikey=${APIKEY}`;

    let balanceResponse: any = await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          return response.data.result;
        } else {
          return [];
        }
      })
      .catch((err) => {
        console.debug(err);
        res
          .status(401)
          .end(
            responseBuilder(
              null,
              err instanceof Error ? err.message : err,
              false
            )
          );
      });

    if (balanceResponse.length === 0 || !balanceResponse) {
      res.status(401).send(responseBuilder([], "balance not found", false));
    } else {
      console.debug("response", formatBalanceResponse(balanceResponse));
      res
        .status(200)
        .send(
          responseBuilder(
            formatBalanceResponse(balanceResponse),
            "balaces retrieved successfully",
            true
          )
        );
    }
  } catch (err) {
    res
      .status(401)
      .end(
        responseBuilder(null, err instanceof Error ? err.message : err, false)
      );
  }
};
