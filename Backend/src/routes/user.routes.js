import {Router} from "express"
import {loginUser, registerUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetail, updateUserGoal} from "../controllers/user.controllers.js"
import {getUserPlan,getGoals} from "../controllers/goal.controller.js"
import {verifyjwt} from "../middlewares/auth.middleware.js"
import multer from "multer";

const router = Router()
const upload = multer(); 

router.route("/register").post(registerUser)

router.route("/login").post(upload.none(),loginUser)

// secure routes

router.route("/logout").post(verifyjwt, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyjwt,changeCurrentPassword)
router.route("/current-user").get(verifyjwt,getCurrentUser)
router.route("/update-account").patch(verifyjwt,updateAccountDetail)
router.route("/update-goal").patch(verifyjwt,updateUserGoal)
router.route("/plan").get(verifyjwt,getUserPlan);
router.route("/goals").get(getGoals);
export default router