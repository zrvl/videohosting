import {NavLink, NavigateFunction, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { stateStore } from '../../store/store';
import { useAppDispatch } from '../../store/store';
import { IUser } from '../../types/user.type';
import { exitUser } from '../../store/Slices/user.slice';
import './header.scss'

const Header = () => {
  const user: IUser = useSelector((store:stateStore) => store.userReducer)
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const logoutUser = () => {
      localStorage.removeItem('token');
      dispatch(exitUser())
      navigate('/')
  }

  return (
    <>
      <div className="header">
        <div className="header-items">
          <NavLink className="header-link" to="/">Home</NavLink>
          {
            user.id == -1 ?
            <>
              <NavLink className="header-link" to="/registration">Registration</NavLink>
              <NavLink className="header-link" to="/authorization">Authorization</NavLink>
            </>
            :
            <>
              <NavLink className="header-link" to="/profile">Profile</NavLink>
              <button className="header-button" onClick={logoutUser}>Logout</button>
            </>
          }
        </div>
      </div>
    </>
  );
};
export default Header;
