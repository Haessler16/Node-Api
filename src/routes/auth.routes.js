import { Router } from 'express'
import * as userCtrl from "../controllers/auth.controllers"

const router = Router()

router.post("/signin", userCtrl.signIn)
router.post("/signup", userCtrl.signUp)

export default router
