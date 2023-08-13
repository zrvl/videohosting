import { Router } from "express";
import VerifyController from "../controllers/verifyController.js";
import { checkAuth } from "../middleware/checkAuth.js";


const routerVerify = new Router();

routerVerify.post('/', checkAuth, VerifyController.post)
// routerVerify.get('/', VerifyController.get)


export default routerVerify;