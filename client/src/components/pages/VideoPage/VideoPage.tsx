import { Params, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IVideo } from "../../../types/video.type";
import { stateStore, useAppDispatch } from "../../../store/store";
import { useEffect, useRef } from "react";
import { getVideoById } from "../../../store/Slices/video.slice";
import axios from "axios";

const VideoPage = () => {
    const {id} = useParams() as {id:string|undefined}
    const dispatch = useAppDispatch();
    const video:IVideo = useSelector((store: stateStore) => store.videoReducer);

    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(()=>{
        if (video.id != -1) {
            fetchVideo();
        }
    })

    const fetchVideo = async (): Promise<void> => {
        const response = await axios.get("http://127.0.0.1:5000/api/video/stream/"+video.id, {
            responseType: 'arraybuffer'
        });

        const videoBlob: Blob = new Blob([response.data], { type: 'video/mp4' });
        const videoUrl: string = URL.createObjectURL(videoBlob);
        if (videoRef.current) {
            videoRef.current.src = videoUrl;
        } 
        
    };


    useEffect(() => {
        dispatch(getVideoById(id))
    }, [])

    if (video.id != -1) {
        return (
            <div>
                <div>
                    <img src={'http://127.0.0.1:5000/'+video.pathImg} />
                    <video ref={videoRef} controls style={{width:"400px"}}></video>
                    <p>{video.title}</p>
                </div>
            </div>
          );
    }
    else {
        return <h1>hello</h1>
    }
};
export default VideoPage;
