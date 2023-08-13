import { User, VerifyUser } from "../models/index.js";
import jwt from 'jsonwebtoken';
import Error from "../errorHandlers.js";


class VerifyController {
    static async post(req, res) {
        try{
            const {code} = req.body;
            const tmp_user = req.user
            const verifyUser = await VerifyUser.findOne({where: {UserId: tmp_user.id}});
            const user = await User.findOne({where: {id: tmp_user.id}});
            if (verifyUser) {
                if (code == verifyUser.code) {
                    verifyUser.status = true;
                    verifyUser.save();
                    // Создать клас юзера и отправлять в токен, чтобы не прописывать много кода
                    const token = jwt.sign({id: user.id, name: user.name, email: user.email, verify: verifyUser.status}, process.env.SECRETKEY, {expiresIn: '24h'});
                    return res.json({token})
                } else {
                    const error = Error.BadRequest(`Невірний код підтвердження`);
                    return res.status(error.statusCode).json(error);
                }
            } else {
                const error = Error.NotFound(`Пройдіть верифікацію аккаунта`);
                return res.status(error.statusCode).json(error);
            }
        } catch(err) {
            const error = Error.ServerError(`${err.message}`);
            return res.status(error.statusCode).json(error)
        }
    }

}

export default VerifyController;