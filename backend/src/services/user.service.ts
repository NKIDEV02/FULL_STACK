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
