import sequelize from "../db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("User", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(20), allowNull: true},
    email: {type: DataTypes.STRING(100), unique: true},
    password: {type: DataTypes.STRING(100), unique: true},
})

export const Video = sequelize.define("Video", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING(100), unique: true},
    pathImg: {type: DataTypes.STRING},
    pathVideo: {type: DataTypes.STRING}
})

export const Likes = sequelize.define("Likes", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    videoId: {type: DataTypes.INTEGER}
});

export const LikedVideos = sequelize.define("LikedVideos", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const Tags = sequelize.define("Tags", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING(100), unique: true},
});

export const VideoTags = sequelize.define("VideoTags", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

export const VerifyUser = sequelize.define("VerifyUser", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING, unique: true},
    status: {type: DataTypes.BOOLEAN}
});


User.hasMany(Video, {as: 'videos'})
Video.belongsTo(User);

// User.hasMany(LikedVideos, {as: 'likedvideos'})
// LikedVideos.belongsTo(User);

// Video.hasMany(Likes, {as: 'likes'})
// Likes.belongsTo(Video);

User.hasOne(VerifyUser);
VerifyUser.belongsTo(User);

Tags.belongsToMany(Video, {through: VideoTags,as:'tags'})
Video.belongsToMany(Tags, {through: VideoTags,as:'tags'})
