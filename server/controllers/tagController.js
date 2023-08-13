import { Tags, VideoTags, Video } from "../models/index.js";
import Error from "../errorHandlers.js";

class TagController {

    static async post (req, res) {
        try{
            const {idVideo, title} = req.body;
            let tag = await Tags.findOne({where: {title: title}});
            if (!tag) {
                tag = await Tags.create({title:title});
            } 
            await VideoTags.create({TagId: tag.id, VideoId: idVideo});
            return res.json(tag);
        } catch(err) {
            const error = Error.ServerError(`${err.message}`);
            return res.status(error.statusCode).json(error.msg)
        }
        
    }

}

export default TagController;
