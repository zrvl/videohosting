import { fileURLToPath } from "url";
import { dirname } from "path";
import {v4 as uuidv4} from 'uuid'
import path from "path";
import { Video, Tags, VideoTags } from "../models/index.js";
import fs from 'fs';
import Error from "../errorHandlers.js";
// import * as ffmpeg from 'ffmpeg';
// import { spawn } from "child_process";
// import { response } from "express";

class VideoController {
    static async post(req, res) {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        try{
            if (req.files == null) {
                const error = Error.BadRequest(`Додайте файл`);
                return res.status(error.statusCode).json(error)
            }
            const {videoName} = req.body;
            const {videoFile} = req.files;
            const {photoFile} = req.files;
            if (!videoName) {
                const error = Error.BadRequest(`Введіть назву відео`);
                return res.status(error.statusCode).json(error)
            }
            const user = req.user;
            const video = await Video.findOne({where: {title: videoName}})
            const imgFormat = photoFile.mimetype.split('/')[1];
            const filePhotoName = uuidv4()+ "." + imgFormat;
            const videoFormat = videoFile.mimetype.split('/')[1];
            const fileVideoName = uuidv4() + '.' + videoFormat;
            const pathFull = `static/${user.name}/${videoName}`
            const fullPathVideo = `${user.name}/${videoName}/${fileVideoName}`
            const fullPathPhoto = `${user.name}/${videoName}/${filePhotoName}`
            if (!video) {
                fs.mkdir(pathFull, {recursive:true}, async (err) => {
                    if (!err) {
                        photoFile.mv(path.resolve(__dirname, '..','static', `${user.name}`, `${videoName}`, filePhotoName));
                        videoFile.mv(path.resolve(__dirname,  '..','static',`${user.name}`, `${videoName}`, fileVideoName));
                        const video = await Video.create({title: videoName, pathImg: fullPathPhoto, pathVideo: fullPathVideo, UserId: user.id})
                        return res.json(video);
                    }
                    const error = Error.BadRequest(`Не вдалось додати відео, спробуйте ще раз`);
                    return res.status(error.statusCode).json(error)
                })
            } else {
                const error = Error.BadRequest(`Відео з такою назвою вже створено`);
                return res.status(error.statusCode).json({message:error.errorMessage})
            }
        } catch(err) {
            const error = Error.ServerError(`${err.message}`);
            return res.status(error.statusCode).json(error)
        }
    }
    static async getVideoById(req, res) {
        const videoId = req.params.id
        if (!videoId) {
            const error = Error.BadRequest('Неверный ID');
            return res.status(error.statusCode).json(error.msg)
        }
        const video = await Video.findOne({where: {id: videoId}})
        if (video) {
            return res.json(video)
        } else {
            const error = Error.NotFound('Видео не найдено');
            return res.status(error.statusCode).json(error.msg)
        }
    }
    static async getPersonalVideos(req, res) {
        const user = req.user;
        const videos = await Video.findAll({where: {UserId: user.id}})
        if (videos.length > 0) {
            return res.json(videos);
        }
        return res.json([])
    }
    static async getAll(req, res) {
        try{
            const videos = await Video.findAll();
            if (videos.length > 0) {
                return res.json(videos);
            } else {
                const error = Error.BadRequst("Відео не знайдено");
                return res.status(error.statusCode).json(error.msg)
            }
        } catch(err) {
            const error = Error.ServerError(`${err.message}`);
            return res.status(error.statusCode).json(error.msg)
        }
    }
    static async getByTag(req, res) {
        try{
            const {title} = req.body;
            const tag = await Tags.findOne({where: {
                title: title
            }})
            if (tag) {
                const videoTags = await VideoTags.findAll({where: {
                    TagId: tag.id
                }})
                const videos = [];
                for (const videoTag of videoTags) {
                    videos.push(await Video.findOne({where: {id:videoTag.VideoId}}))
                }
                return res.json(videos)
            } else {
                const error = Error.NotFound(`Відео не знайдено`);
                return res.status(error.statusCode).json(error.msg) 
            }
        } catch(err) {
            const error = Error.ServerError(`${err.message}`);
            return res.status(error.statusCode).json(error.msg)
        }
    }
    static async getVideoWithTags(req, res) {
        try{
            const {idVideo} = req.body;
            const video = await Video.findOne({
                where: {id: idVideo},
                include: [{
                    model: Tags, 
                    as:"tags",
                    through: {
                        model: VideoTags,
                        as:"tags"
                    }
                }]
            })
            if (video) {
                return res.json(video);
            } else {
                const error = Error.NotFound(`Відео не знайдено`);
                return res.status(error.statusCode).json(error.msg) 
            }
        } catch(err) {
            const error = Error.ServerError(`${err.message}`);
            return res.status(error.statusCode).json(error.msg)
        }
    }
    static async strim(req, res) {
        const {id} = req.params
        const video = await Video.findOne({where: {id}})
        const stat = fs.statSync(path.resolve('static',video.pathVideo))
        const fileSize = stat.size
        const range = req.headers.range

        if(range) {
            console.log(range)
            const parts = range.replace('bytes=','').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
            const chunkSize = end - start + 1;
        
            res.status(206);
            res.header('Content-Range', `bytes ${start}-${end}/${fileSize}`)
            res.header('Accept-Ranges', `bytes`)
            res.header('Content-Type','video/mp4') // доставать формат из видео
            res.header('Content-Length',chunkSize);
        
            const file = fs.createReadStream(path.resolve('static',video.pathVideo), { start, end });        
            file.pipe(res);     
        }
        else {
            res.header('Content-Type', 'video/mp4')
            res.header('Content-Length', fileSize)
        }
        fs.createReadStream(path.resolve('static',video.pathVideo)).pipe(res);
    }
}

export default VideoController;


/*
            const ffmpegArgs = [
                '-i',
                path.resolve('static',video.pathVideo),
                '-c:v',
                'libx264',
                '-preset',
                'slow',
                '-crf',
                '18',
                '-maxrate',
                '10M',
                '-bufsize',
                '20M',
                '-c:a',
                'copy',
                '-movflags',
                '+faststart',
                '-f',
                'mp4',
                'pipe:1',
            ];

            console.log(1)
            const ffmpegProcess = spawn('ffmpeg', ffmpegArgs, {stdio: ['ignore', 'pipe', 'ignore']});
            console.log(2)

            ffmpegProcess.stdout.on('data',(data) => {
                res.write(data);
            })

            ffmpegProcess.stdout.on('end',()=>{
                res.end();
            })
            */