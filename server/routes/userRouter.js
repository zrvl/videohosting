import { Router } from "express";
import UserController from "../controllers/userController.js";
import { signupValidator, signinValidator, validatorResult } from "../middleware/validator.js";

const routerUser = new Router();

routerUser.post('/signup', signupValidator, validatorResult, UserController.signUp)
routerUser.post('/signin', signinValidator, validatorResult, UserController.signIn)

export default routerUser;