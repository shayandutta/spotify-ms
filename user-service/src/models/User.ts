import mongoose, {model, Schema} from "mongoose";
import {Role} from "../utils/common";

interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string,
    email: string,
    password: string,
    role: Role,
    playlist: string[],
}

const userSchema = new Schema<IUser>({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.USER,
    },
    playlist: [
        {        
            type: String,
            required: true,
            ref: "Book",
        }
    ]
},{
    timestamps: true,
});

const User = model<IUser>("User", userSchema);
export {IUser, User}