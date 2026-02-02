/// <reference path="../types/express.d.ts" />

import { Request, Response, NextFunction } from "express";
import { AppError, ErrorResponse } from "../utils";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ServerConfig } from "../config";
import userRepository from "../repositories/userRepository";

async function requestValidator (req:Request, res:Response, next:NextFunction){
    try{
        if(!req.body.email || !req.body.password){
            throw new AppError("mandatory fields", StatusCodes.BAD_REQUEST);
        } 
        next();
    }catch(error:any){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function isAuthenticated(req:Request, res:Response, next:NextFunction){
    try{
        const token = req.headers.authorization as string;
        if(!token){
            throw new AppError("Please login", StatusCodes.FORBIDDEN);
        }

        const decoded = jwt.verify(token, ServerConfig.JWT_SECRET as string) as JwtPayload;
        if(!decoded || !decoded.id){
            throw new AppError("Invalid token", StatusCodes.FORBIDDEN)
        };

        const userId = decoded.id;

        const user = await userRepository.get(userId);
        if(!user){
            throw new AppError("No User Exist", StatusCodes.FORBIDDEN);
        }
        req.user = user;
        next();
    }catch(error:any){
        throw error;
    }
}

export default {
    requestValidator,
    isAuthenticated
};