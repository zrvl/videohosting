import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  
);




/*
  1 - нет проверки сложности пароля +
  2 - при авторизации говорит, что слабый пароль, а не его отсутсвтие +
  4 - {email:string,username:string,password:string} - создавать отдельно файлик под типы и создавать там интерфейсы +
  5 - Компоненты (input) +
  6 - helpers -> UI компоненты +
  9 - Добавить в инпут accept +

  убрать хедер из страничек +
  убрать спецсимволы из кода - оставить буквы и цифры +
  */
 
  
 
 
  //  3 - поубирать any +-
  //  текст ошибки пустой
  //  7 - местами типы данных
  //  8 - Создать тайп под видео и фото файлы