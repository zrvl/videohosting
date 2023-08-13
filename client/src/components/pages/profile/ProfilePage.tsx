import { FormEvent, useState, useEffect, useMemo } from "react";
import { stateStore, useAppDispatch } from "../../../store/store";
import { useSelector } from "react-redux";
import { IUser } from "../../../types/user.type";
import { IVideo, IVideos } from "../../../types/video.type";
import { getVideos, createVideo } from "../../../store/Slices/videos.slice";
import Error from "../../UI/Messages/Error";
import Success from "../../UI/Messages/Success";
import ProfileInput from "../../UI/InputForm/ProfileInput";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user: IUser = useSelector((store: stateStore) => store.userReducer)
  const video: IVideo = useSelector((store: stateStore) => store.videoReducer);
  const videos: IVideos = useSelector((store: stateStore) => store.videosReducer);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const initData: {videoName:string, videoFile:any, photoFile:object|null} = {
    videoName: "",
    videoFile: null,
    photoFile: null
  }
  const [dataCreateVideo, setDataCreateVideo] = useState(initData)
  
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createVideo({token: localStorage.getItem('token') as string, video:dataCreateVideo}))
  }

  const setFile = (e: React.ChangeEvent<HTMLInputElement>,type:string) => {
    if(e.target.files && type == 'photo') {
      setDataCreateVideo({...dataCreateVideo, photoFile: e.target.files[0]})
    }
    else if (e.target.files && type == 'video') {
      setDataCreateVideo({...dataCreateVideo, videoFile: e.target.files[0]})
    }
  }

  useEffect(() => {
    dispatch(getVideos({token: localStorage.getItem('token') as string}))
  }, [])
  
  return (
    <div>  
      {video.status == 'error' ? <Error msg={video.messageError} /> : <></>}
      {videos.status == 'error' ? <Error msg={videos.messageError} /> : <></>}
      {video.status == 'success' ? <Success msg='Відео додано' /> : <></>}
      {
        user.verify == true ?
        <div>
          <div>
            <form onSubmit={submit}>
              <ProfileInput type="text" placeholder="video title" value={dataCreateVideo.videoName} onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDataCreateVideo({...dataCreateVideo, videoName: e.target.value})} />
              <ProfileInput type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFile(e, "photo")} accept=".png, .jpg, .jpeg" />
              <ProfileInput type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setFile(e, "video")} accept="video/*" />
              <button>submit</button>
            </form>
          </div>
          <div>
            {videos.videos.map((video) => (
              <div onClick={() => navigate(`/video/${video.id}`)} key={video.id}>
                <div>
                  <img src={'http://127.0.0.1:5000/'+video.pathImg} />
                </div>
                <p>{video.title}</p>
              </div>
            ))}
          </div>
        </div>
        :
        <div>
          <p>
            Пройдіть верифікацію аккаунта
          </p>
        </div>
      }
    </div>
  );
};
export default ProfilePage;
