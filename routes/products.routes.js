const { Router } = require("express");
const {
  GETProducts,
  POSTProducts,
  PATCHProducts,
  DELETEProducts,
  GETProductByID,
} = require("../controllers/products.controller");

const router = Router();

router.get("/", GETProducts);

router.get("/:id", GETProductByID);

router.post("/", POSTProducts);

router.patch("/", PATCHProducts);

router.delete("/", DELETEProducts);

module.exports = router;
