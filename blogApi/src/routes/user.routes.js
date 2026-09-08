import express from "express";
import {userRegister, loginUser, logoutUser, getProfile} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();


//routes
router.post("/register", userRegister);


router.post("/login", loginUser)

//protected routes


router.post("/logout", verifyJWT, logoutUser)

router.get("/get-profile", verifyJWT, getProfile)

export default router;