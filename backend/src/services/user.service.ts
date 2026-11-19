import { number } from "zod";
import { user } from "../models/user"


export const getUserByEmail = async (email: string)=>{
    return user.findOne({
        where:{
            email
        }
    })
}


export const addUser = async (name: string, email: string, password: string)=>{
    const User = new user();

    User.name = name;
    User.email = email;
    User.password = password;


    return User.save();
}



export const updateUser = async ({name, status, id, password}:{
    name?: string,
    status?: "active" | "pending",
    id: number,
    password?: string

})=>{
    const User = await user.findByPk(id);

    if(!User)
        throw new Error('User not found');

    if(name)
        User.name = name;

    if(status)
        User.status = status;

     if(password)
        User.password = password;

    return User.save();
}