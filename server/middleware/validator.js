import { check, validationResult } from "express-validator";

export const signupValidator = [
    // check('username')
    //     .not().isEmpty()
    //     .trim()
    //     .withMessage('All fields required'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Укажіть пошту'),
    // check('password')
    //     .isLength({min: 6})
    //     .withMessage('Password must be at least 6 characters'),
]

export const signinValidator = [
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Укажіть пошту'),
    // check('password')
    //     .isLength({min: 6})
    //     .withMessage('Password must be at least 6 characters'),
]

export const validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if(hasErrors) {
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage:firstError
        })
    }
    next();
}