import { Router } from "express";
import TagController from "../controllers/tagController.js";


const routerTag = new Router();

routerTag.post('/', TagController.post)

export default routerTag;