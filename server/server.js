import sequelize from "./db.js";
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from "./routes/index.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fileUpload from 'express-fileupload';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router);


const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(process.env.PORT, () => console.log('Server started on port ' +  process.env.PORT));
    } catch(err) {
        console.log(err.message)
    }
}
start();


// Посмотреть видео про связи между таблицами
// Пройти 4 главу

/*
видеохостинг  JWT, Middleware, ErrorHadler, StatusCode, REST, MVC, 
Статика - в папке статик, должны быть папки с названием юзера, и в папке каждого юзера, будут папки с названием видео, где в папке с названием видео - лежит само видео и картинка

1 - Создать аккаунт (jwt)
2 - Добавить видео (Только если ты имеешь аккаунт, отправлять jwt token)
3 - показать все видео 
4 - показать видео по тегу
    * отправляется название тега
    * найти тег 
    * найти ийдшники видео по ид тега
    * найти все видео по ид
5 - показать 1 видео с его полной подробной информацией (всей) + теги
6 - добавить тег
    * отправляется ид видео, название тега
    * создается объект тега
    * создается запись в таблице VideoTags в который ты отдаешь ид видео, и ид тега (ид тега получаешь из уже самого объекта)

Cвязь между аккаунтом и видео

аккаунт
    имя емаил пароль 
видео
    картинку,видео,название видео, количество просмотров,лайки, комментарии (могут оставлять только рег юзеры)
теги
    каждое видео имеет теги.
*/


/*

CОЗДАТЬ ПАПКУ ПОД СЕРВЕР

1 - !!! Создать роуты на фронте - для регистрации, авторизацdи,  -> странички профиля ПРИВАТНЫЙ РОУТ 
2 - Cделать описание ошибок так, чтобы было понятно, что не так сделал пользователь + json по правилам rest
3 - Обрабатывать возможные ошибки и давать соответствующий статус код
8 - Запрос на перевыпуск токена
*/





