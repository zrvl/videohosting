import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    'video',
    process.env.NAMEUSER,
    process.env.PASSWORD,
    {
        dialect: process.env.DIALECT,
        host: process.env.HOST,
        port: process.env.PORTDB,
    }
)

export default sequelize;