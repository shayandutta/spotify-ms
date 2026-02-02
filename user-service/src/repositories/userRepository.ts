import {CrudRepository} from "./crudRepository";
import {IUser, User} from "../models/User"
import { AppError } from "../utils";
import { StatusCodes } from "http-status-codes";

class UserRepository extends CrudRepository<IUser>{
    constructor(){
        super(User as any)
    }

    async getByEmail(email:string): Promise<IUser>{
        const user = await User.findOne({email});
        return user as IUser;
    }
};

const userRepository = new UserRepository();

export default userRepository