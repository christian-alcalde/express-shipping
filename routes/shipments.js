"use strict";

const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const orderSchema = require("../schema/orderSchema.json");

const { shipProduct } = require("../shipItApi");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  console.log(req.body);
  const result = jsonschema.validate(req.body, orderSchema);
  if (!result.valid) {
    let errors = result.errors.map((err) => err.stack);
    throw new BadRequestError(errors);
  }

  const shipId = await shipProduct(req.body);
  return res.json({ shipped: shipId });
});

module.exports = router;
