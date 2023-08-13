import { Router } from "express";
import routerUser from "./userRouter.js";
import routerVideo from "./videoRouter.js";
import routerTag from "./tagRouter.js";
import routerVerify from "./verifyRouter.js";

const router = new Router();

router.use('/user', routerUser);
router.use('/video', routerVideo);
router.use('/tag', routerTag);
router.use('/verify', routerVerify)

export default router;