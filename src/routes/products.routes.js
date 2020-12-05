import { Router } from "express";
const router = Router();
import { isAdmin, isModerator, verifyToken } from "../middlewares";
import * as productsCtl from "../controllers/products.controllers";

router.get("/", productsCtl.getProducts);
router.post("/", [verifyToken, isModerator], productsCtl.createProducts);
router.get("/:productId", productsCtl.getProductsById);
router.put(
  "/:productId",
  [verifyToken, isAdmin],
  productsCtl.updateProductsById
);
router.delete(
  "/:productId",
  [verifyToken, isAdmin],
  productsCtl.deleteProductsById
);

export default router;
