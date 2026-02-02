import userRepository from "../repositories/userRepository";
import AppError from "../utils/errors/app-error";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../models/User";

const registerUser = async(data: any) => {
    try{
        const response = await userRepository.create(data);
        return response;
    }catch(error:any){
        throw new AppError("cannot register user", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const findUserByEmail = async(email: string) => {
        const response = await userRepository.findOne({email});
        return response;
}

// async function loginUser(data: any) {
//     try{
//         const response = await userRepository.get(data);
//         return response;
//     }catch(error:any){
//         throw new AppError("user does not exist", StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }


export default {
    registerUser,
    findUserByEmail,
    // loginUser
}