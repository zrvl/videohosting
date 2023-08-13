import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.HOST_SMTP,
  port: process.env.PORT_SMTP,
  secure: process.env.SECURE_SMTP,
  auth: {
    user: process.env.USER_SMTP,
    pass: process.env.PASSWORD_SMTP
  } 
})

export const createKey = () => {
    const symbols = 'AQWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'
    const min = 0;
    const max = symbols.length-1
    let key = '';
    for (let i=1; i<=12; i++) {
        let rand = min + Math.random() * (max + 1 - min);
        const idx = Math.floor(rand);
        key += symbols[idx]
    }
    return key;
  }
// const key = createKey();

// const mail = {
//     from: 'zhuravelbogdan0@meta.ua',
//     to: 'zhuravelbogdan0@gmail.com',
//     subject: 'Подтвердите свой email',
//     text: `Перейдите по ссылке для подтверждения почты http://127.0.0.1:3000/user/verify/${key}`
// }

// transporter.sendMail(mail,(error,info) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log(info.response)
//     }
// })



  