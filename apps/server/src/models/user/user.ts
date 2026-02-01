import { NICKNAME_MAX, NICKNAME_MIN, USERNAME_MAX, USERNAME_MIN } from "@repo/constants";
import mongoose from "mongoose";
import type { UserModel } from "../../types/user";


export const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: USERNAME_MIN,
        maxlength: USERNAME_MAX,
        required: true
    },
    nickname: {
        type: String,
        minlength: NICKNAME_MIN,
        maxlength: NICKNAME_MAX,
        required: false,
        default: null
    }
})

const User = mongoose.model<UserModel>('User', userSchema);

export default User;