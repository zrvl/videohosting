import jwtDecode from "jwt-decode";
import Error from "../errorHandlers.js";
import jwt from 'jsonwebtoken';


export const checkAuth = (req,resp,next) => {
    const token = req.headers.authorization;
    if (token) {
        try{
            jwt.verify(token.split(' ')[1], process.env.SECRETKEY);
        } catch(err) {
            const error = Error.NotAuth('Токен не верифіковано')
            return resp.status(error.statusCode).json(error)
        }
        const user = jwtDecode(token);
        req.user = user
    } else {
        const error = Error.NotFound('Токен не знайдено')
        return resp.status(error.statusCode).json(error)
    }
    next()
}

export const validPassword = (password) => {
    if (!(/(?=.*[0-9])/.test(password))) {
        return 'Пароль повинен мати хоча б одне число'
    }
    if (!(/(?=.*[!@#$%^&*])/.test(password))) {
        return 'Пароль повинен мати хоча б один спецсимвол'
    }
    if (!(/(?=.*[a-z])/.test(password))) {
        return 'Пароль повинен мати хоча б одну латинську букву в нижньому реєстрі'
    }
    if (!(/(?=.*[A-Z])/.test(password))) {
        return 'Пароль повинен мати хоча б одну латинську букву у верхньому реєстрі'
    }
    if (!(/[0-9a-zA-Z!@#$%^&*]{6,}/.test(password))) {
        return 'Пароль повинен мати не менше 6 символів'
    }
    return true;
}

export const validName = (name) => {
    if (!name) {
        return 'Введіть ім\'я'
    }
    if (name.length <= 2) {
        return 'Ім\'я має містити більше символів'
    }
    return true;
}