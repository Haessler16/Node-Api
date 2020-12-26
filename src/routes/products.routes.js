import { Router } from "express";
import {authJwt } from "../middlewares";
import * as productsCtl from "../controllers/products.controllers";
const router = Router();

router.get("/", productsCtl.getProducts);
router.post("/", [authJwt.verifyToken, authJwt.isModerator], productsCtl.createProducts);
router.get("/:productId", productsCtl.getProductsById);
router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtl.updateProductsById
);
router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtl.deleteProductsById
);

export default router;
