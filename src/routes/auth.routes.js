import { Router } from "express";
import * as userCtrl from "../controllers/auth.controllers";
import { verifySignup } from "../middlewares";

const router = Router();

router.post(
  "/signin",
  [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRoleExisted],
  userCtrl.signIn
);
router.post("/signup", userCtrl.signUp);

export default router;
