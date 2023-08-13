import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateStore } from "../../store/store";
import { IUser } from "../../types/user.type";
import { useAppDispatch } from "../../store/store";
import { verify } from "../../store/Slices/user.slice";
import {useEffect, useState} from 'react'
import Error from "../UI/Messages/Error";

const VerifyPage = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const {key} = useParams();
  const dispatch = useAppDispatch();
  const token: string | null = localStorage.getItem('token');
  const user: IUser = useSelector((store:stateStore) => store.userReducer);
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (token && key) {
      if (!user.verify) {
        dispatch(verify({code:key, token}));
      }
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 2000);
    }
  },[])
  

  useEffect(() => {
    if (user.verify == true) {
      navigate('/profile')
    }
  }, [user])
  

  if (errorMessage) {
    return <Error msg='Перезайдіть в аккаунт' />
  } else if (user.status == 'error') {
    return <h1>{user.messageError}</h1>
  } else {
    return <h1>Проходить верифікація аккаунта</h1>
  }

};
export default VerifyPage;
