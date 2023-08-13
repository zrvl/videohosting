import {useEffect} from 'react'
import { stateStore, useAppDispatch } from "../../../store/store";
import { getAllVideos } from '../../../store/Slices/videos.slice';
import { useSelector } from 'react-redux';
import { IVideos } from '../../../types/video.type';
import { useNavigate } from 'react-router-dom';
import './homePage.scss'
const HomePage = () => {
  const dispatch = useAppDispatch();
  const videos: IVideos = useSelector((store: stateStore) => store.videosReducer)
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllVideos())
  }, [])

  console.log(videos)

  return (
    <div className="home">
      <div className="home-menu">
        <input className="home-menu__search" placeholder='search' />
      </div>
      <div className="home-items">
        {videos.videos.map((video) => (
          <div className="home-item" onClick={() => navigate(`/video/${video.id}`)} key={video.id}>
          <div className="home-item__box">
            <img className="home-item__img" src={'http://127.0.0.1:5000/'+video.pathImg} />
          </div>
          <p className="home-item__title">{video.title}</p>
        </div>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
