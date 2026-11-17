import { Request, Response } from "express";
import z, { email, optional } from "zod";
import { addUser, getUserByEmail } from "../services/user.service";
import { encryptPassword, generateToken, verifyToken } from "../shared/auth.util";
import { addToken, deleteTokens, getToken } from "../services/token.service";


// Create a register controller to handle the request and response for the auth routes
export const registerController = async (req: Request, res: Response) =>{
     
    // Validate the request body using zod
            const schema = z.object({
                name: z.string().min(3).max(100),
                email: z.string(),
                password: z.string().min(6).max(100).regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
                message: "Le mot de passe doit contenir une majuscule et un chiffre"
    })
            });
        
            const parsedData = schema.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json({message: 'Invalid data', errors: parsedData.error})
            }

            const {name, email, password} = parsedData.data;

            const existingUser = await getUserByEmail(email)

             if(existingUser){
                return res.status(400).json({message: 'User already exists'});
            }

            const hashedPassword  = encryptPassword(password)


            // Create user 
            let User = await addUser(name, email, hashedPassword );

            // display the result without password
            const { password: _, ...userWithoutPassword } = User.toJSON();

            // TODO: send email verification

            return res.status(201).json(userWithoutPassword);
}



export const loginController = async (req: Request, res: Response) =>{
     
    // Validate the request body using zod
            const schema = z.object({
                email: z.string(),
                password: z.string().min(6).max(100)
            });
        
            const parsedData = schema.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json({message: 'Invalid data', errors: parsedData.error})
            }

            const {email, password} = parsedData.data;

            const User = await getUserByEmail(email);

            if(!User)
                return res.status(400).json({message: 'User not found'});


            // hashedPassword = password
            const dbPassword = verifyToken(User.password);

            if(dbPassword !== password){
                return res.status(400).json({message: 'Invalid password'})
            }

            
            const userId = User.get('id'); // ✅ Ajoutez cette ligne

            // Generate token
            const accessToken = generateToken(userId);
            const refreshToken = generateToken(userId, '7d');

            // delete old token
            await deleteTokens(userId);

            // Save refresh token
            await addToken(refreshToken, 'refresh', userId);
            await addToken(accessToken, 'access', userId);


            // Create and send session to client
            const session = {
                accessToken,
                refreshToken,
                User: User.toJSON()
            }

            //delete session.User.password;
            // display the result without password in the session
            const { password: _, ...sessionWithoutPassword } = User.toJSON();

            return res.status(200).json(sessionWithoutPassword);

            
}



export const refreshTokenController = async (req: Request, res: Response) =>{
     // Validate the request body using zod
            const schema = z.object({
                refreshToken: z.string()
            });
        
            const parsedData = schema.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json({message: 'Invalid data', errors: parsedData.error})
            }

            const {refreshToken} = parsedData.data;


            const isTokenValid = verifyToken(refreshToken);
            if(!isTokenValid){
                return res.status(400).json({message: 'Invalid token or expired.'});
            }


            const dbRefreshToken = await getToken(refreshToken);

            if(!dbRefreshToken || dbRefreshToken.get('type') !== 'refresh')
                return res.status(400).json({message: 'Invalid token'});

            const userId = dbRefreshToken.get('userId');

            const accessToken = generateToken(userId);
            const newRefreshToken = generateToken(userId, '7d');

            // delete old tokens
            await deleteTokens(userId);

             // Save refresh token
            await addToken(newRefreshToken, 'refresh', userId);
            await addToken(accessToken, 'access', userId);

            return res.status(200).json({
                accessToken, 
                refreshToken: newRefreshToken
            });

}



export const logoutController = async (req: Request, res: Response) =>{

    // Validate the request body using zod
            const schema = z.object({
                refreshToken: z.string()
            });
        
            const parsedData = schema.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json({message: 'Invalid data', errors: parsedData.error})
            }

            const {refreshToken} = parsedData.data;

             const isTokenValid = verifyToken(refreshToken);
            if(!isTokenValid){
                return res.status(400).json({message: 'Invalid token or expired.'});
            }

            const dbRefreshToken = await getToken(refreshToken);

            if(!dbRefreshToken || dbRefreshToken.get('type') !== 'refresh')
                return res.status(400).json({message: 'Invalid token'});


            const userId = dbRefreshToken.get('userId');


            // delete old tokens
            await deleteTokens(userId);


            return res.status(200).json({message : 'Logged out.'});
}