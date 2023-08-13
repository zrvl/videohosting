import './App.css';
import {Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './components/pages/homePage/HomePage';
import RegistrationPage from './components/pages/registration/RegistrationPage';
import AuthorizationPage from './components/pages/authorization/AuthorizationPage';
import ProfilePage from './components/pages/profile/ProfilePage';
import VerifyPage from './components/pages/VerifyPage';
import { useSelector } from 'react-redux';
import { stateStore } from './store/store';
import { IUser } from './types/user.type';
import jwtDecode from "jwt-decode";
import { useAppDispatch } from './store/store';
import { initUser } from './store/Slices/user.slice';
import VideoPage from './components/pages/VideoPage/VideoPage';


function App() {

  /*
    При загрузке страничке проверять наличие токена 
    если токен есть - декодировать его и заполнять стейт юзера значениями из декода
  */ 

  //user
  //dispatch(initUser(user));

  /*
    Добавить кнопку выйти при нажатии на которую пользователя должно разавторизовать. 
    Удаляется токен. Обноваляется стейт

    ДЕЛАЕТСЯ ЧЕРЕЗ action
  */


  const user: IUser  = useSelector( (store:stateStore) => store.userReducer)
  const dispatch = useAppDispatch();
  const checkToken = (): void => {
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const validUser: IUser = jwtDecode(token);
      dispatch(initUser(validUser));
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<HomePage/>} />
        <Route path="/user/verify/:key" element={<VerifyPage/>}/>
        {user.id == -1 ?
            <>
            <Route path="/registration" element={<RegistrationPage/>} />
            <Route path="/authorization" element={<AuthorizationPage/>} />
            <Route path="/video/:id" element={<VideoPage/>} />
            </>
          :
          <>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/registration" element={<RegistrationPage/>} />
            <Route path="/authorization" element={<AuthorizationPage/>} />
            <Route path="/video/:id" element={<VideoPage/>} />
          </>
        }
        
      </Route>
    </Routes>
  );
}

export default App;
