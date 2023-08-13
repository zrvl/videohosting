import { User, VerifyUser } from "../models/index.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { transporter, createKey } from "../requestSMTP.js";
import Error from "../errorHandlers.js";
import { validPassword, validName } from "../middleware/checkAuth.js";

class UserController {
    static async signUp(req, res) {
        try {
            const {username, email, password} = req.body;
            const checkName = validName(username);
            const checkPassword = validPassword(password);
            if (typeof checkName !== 'boolean') {
                const error = Error.BadRequest(checkName);
                return res.status(error.statusCode).json(error)
            }
            if (typeof checkPassword !== "boolean") {
                const error = Error.BadRequest(checkPassword);
                return res.status(error.statusCode).json(error);
            }
            const user = await User.findOne({
                where: {email: email}
            })
            if (user) {
                const error = Error.BadRequest("Пошта вже використовується");
                return res.status(error.statusCode).json(error)
            }
            const key = createKey();
            const mail = {
                from: process.env.USER_SMTP,
                // to: `${user.email}`
                to: 'zhuravelbogdan0@gmail.com',
                subject: 'Подтвердите свой email',
                text: `Перейдите по ссылке для подтверждения почты http://127.0.0.1:3000/user/verify/${key}`
            }
            transporter.sendMail(mail, (error, info) => {
                if (error) {
                    throw new Error(5000, "Технічна помилка, спробуйте пізніше")
                } 
            })
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({name: username, email: email, password: newPassword});
            const verify = await VerifyUser.create({code: key, status: false, UserId: newUser.id});
            const token = jwt.sign({id: newUser.id,name: newUser.name, email: newUser.email,verify:false}, process.env.SECRETKEY, {expiresIn: '24h'})
            return res.json(token)
        } catch(err) {
            const error = Error.ServerError(`${err.message}`);
            return res.status(error.statusCode).json(error)
        }
    }
    static async signIn(req, res) {
        try{
            const {email, password} = req.body;
            const user = await User.findOne({
                where: {email: email}
            })
            if (user) {
                const compare = bcrypt.compareSync(password, user.password)
                if (compare) {
                    const verify = await VerifyUser.findOne({where: {UserId: user.id}})
                    const token = jwt.sign({id: user.id, name: user.name, email: user.email,verify:verify.status}, process.env.SECRETKEY, {expiresIn: '24h'})
                    return res.json(token)
                } else {
                    const error = Error.NotFound("Невірний пароль");
                    return res.status(error.statusCode).json(error)
                }
            } else {
                const error = Error.BadRequest("Пошту не знайдено");
                return res.status(error.statusCode).json(error)
            }
        } catch(err) {
            const error = Error.ServerError(`${err.message}`);
            return res.status(error.statusCode).json(error)
        }
    }

}

export default UserController;