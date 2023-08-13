import './authorization.css';
import { FormEvent, useEffect, useState } from "react";
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import { stateStore, useAppDispatch } from "../../../store/store";
import { IUser } from '../../../types/user.type';
import { authorization } from "../../../store/Slices/user.slice";
import { useSelector } from "react-redux";
import Loading from '../../UI/Messages/Loading';
import Success from '../../UI/Messages/Success';
import Error from '../../UI/Messages/Error';
import AuthInput from '../../UI/InputForm/AuthInput';



const AuthorizationPage = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const user: IUser = useSelector((store:stateStore) => store.userReducer);
  const [dataRegister, setDataRegister] = useState({
    email: '',
    password: '',
  })

  const submit = (e:FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(authorization(dataRegister));
  }

  useEffect(()=>{
    if(user.status == 'success') {
      navigate('/')
    }
  }, [user])

  return (
    <div className="signup container">
    <div className="signup-wrapper">
      <form className="signup-form" onSubmit={submit}>
      {user.status === 'loading' ? <Loading/> : <></>}
      {user.status === 'success' ? <Success msg='Аккаунт створено' /> : <></>}
      {user.status === 'error' ? <Error msg={user.messageError} /> : <></>}
        <div className="signup-item">
          <div className="signup-box">
            <span>
              <i className="fa fa-user"></i>
            </span>
          </div>
          <AuthInput className="signup-input" type="email" value={dataRegister.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDataRegister({...dataRegister, email:e.target.value})} placeholder="email" />
        </div>
        <div className="signup-item">
          <div className="signup-box">
            <span>
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <AuthInput className="signup-input" type="password" value={dataRegister.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDataRegister({...dataRegister, password:e.target.value})} placeholder="password" />
        </div>
        <div className="signup-button__box">
          <button className="signup-button" type="submit">
            Увійти
          </button>
        </div>
        <p className="">
          Немає аккаунта? <NavLink to="/registration">Реєстрація</NavLink>
        </p>
      </form>
    </div>
  </div>
  )
};
export default AuthorizationPage;
