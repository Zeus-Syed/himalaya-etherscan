process.env.NODE_ENV = "test";

import { expect } from "chai";
import * as request from "supertest";

import app from "../../../index";

describe("GET /", async () => {
  it("return default responses if no address is requested by user", () => {
    request(app)
      .get("/balance/getAddressBalance")
      .then((res) => {
        expect(res.body.data.addresses.length).to.equal(5);
      })
      .catch((err) => console.log("catch block this", err));
  });

  it("return same address count in responses as requested by user in request", () => {
    request(app)
      .get(
        "/balance/getAddressBalance?addresses=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae,0x39a582bE8039a526Bdf4730e4D1E3E0fE1Bc811b"
      )
      .then((req, res) => {
        expect(res.body.data.addresses.length).to.equal(
          req.query.addresses.split(",").length
        );
      })
      .catch((err) => console.log("catch block this", err));
  });
});
