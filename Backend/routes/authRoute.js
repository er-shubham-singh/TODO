
import express from "express"
import { registerForm } from "../controller/registerController.js"
import { loginForm } from "../controller/loginController.js";

const mainRouter = express.Router()

mainRouter.post("/register", registerForm)
mainRouter.post("/login", loginForm);

export { mainRouter }
