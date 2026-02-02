import { Request, Response } from "express";
import { userService } from "../services";
import { AppError, ErrorResponse, SuccessResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import jwt, {Secret} from "jsonwebtoken"
import { ServerConfig } from "../config";

const registerUser = async(req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body;
        
        let user = await userService.findUserByEmail(email);
        if(user){
            throw new AppError("User already exists", StatusCodes.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await userService.registerUser({
            name: name,
            email: email,
            password: hashedPassword
        })

        const payload = {
            id: user._id,
            role: user.role
        }
        const token = jwt.sign(payload, ServerConfig.JWT_SECRET as Secret, {
            expiresIn: Number(ServerConfig.JWT_EXPIRY)
        });

        SuccessResponse.data = user;
        return res
        .status(StatusCodes.CREATED)
        .cookie("token", token)
        .json(SuccessResponse);

    }catch(error:any){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse)
    }
}


async function login(req: Request, res: Response){
    try{
        const {email, password} = req.body;
        const user = await userService.findUserByEmail(email)
        if(!user){
            throw new AppError("user does not exist", StatusCodes.BAD_REQUEST);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("invalid password", StatusCodes.BAD_REQUEST);
        }

        const payload = {
            id: user._id,
            role: user.role
        }
        const token = jwt.sign(payload, ServerConfig.JWT_SECRET as Secret, {
            expiresIn: Number(ServerConfig.JWT_EXPIRY)
        });

        SuccessResponse.data=user;
        return res
        .status(StatusCodes.OK)
        .cookie("token", token)
        .json(SuccessResponse)

    }catch(error:any){
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

async function myProfile(req:Request, res:Response){
    try {
        const user = req.user;
        if(!user){
            throw new AppError("User not found", StatusCodes.UNAUTHORIZED);
        }
        SuccessResponse.data = user;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.error = error;
        return res.status(error.statusCode || 500).json(ErrorResponse);
    }
}


export default {
    registerUser,
    login,
    myProfile
}