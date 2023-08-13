import { Router } from "express";
import VideoController from "../controllers/videoController.js";
import { checkAuth } from "../middleware/checkAuth.js";

const routerVideo = new Router();

routerVideo.post('/', checkAuth,  VideoController.post)
routerVideo.get('/getAll', VideoController.getAll)
routerVideo.get('/stream/:id', VideoController.strim);
routerVideo.get('/tag', VideoController.getByTag)
routerVideo.get('/withTags', VideoController.getVideoWithTags)
routerVideo.get('/personalVideos', checkAuth, VideoController.getPersonalVideos);
routerVideo.get('/:id', VideoController.getVideoById)
// routerVideo.get('/description', VideoController.getDescription)


export default routerVideo;