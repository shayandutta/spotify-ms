import {Request, Response, NextFunction} from 'express';
import { Role } from '../utils';
import axios from 'axios';
import { ServerConfig } from '../config';

interface IUser {
    _id?: string;
    name: string,
    email: string,
    password: string,
    role: Role,
    playlist: string[],
}

export const isAuth = async (req:Request, res:Response, next:NextFunction)=> {
    try{
        const token = req.headers.token as string;
        if(!token){
            res.status(403).json({message: "please login"})
            return;
        }

        const {data} = await axios.get(`${ServerConfig.USER_URL}/api/v1/user/me`, { //calling the auth Microservice with the token passed in request header
            headers:{
                token,
            }
        });

        req.user = data;
        next();
    }catch(error : any){
        res.status(403).json({message: "please login"})
    }
}