import {Router} from "express"
import {loginUser, registerUser, logoutUser} from "../controllers/user.controllers.js"
import {verifyjwt} from "../middlewares/auth.middleware.js"
const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

// secure routes

router.route("/logout").post(verifyjwt, logoutUser)
export default router