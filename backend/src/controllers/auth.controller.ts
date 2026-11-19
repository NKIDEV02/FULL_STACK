import { Request, Response } from "express";
import z, { email, optional, string } from "zod";
import { addUser, getUserByEmail, updateUser } from "../services/user.service";
import { encryptPassword, generateToken, verifyToken } from "../shared/auth.util";
import { addToken, deleteTokens, getToken } from "../services/token.service";
import { sendConfirmationEmail, sendForgotPasswordEmail } from "../shared/email.util";

const passwordZodRules = z.string().min(6).max(100).regex(/^(?=.*[A-Z])(?=.*\d).+$/, {
                message: "Le mot de passe doit contenir une majuscule et un chiffre"
    });


// Create a register controller to handle the request and response for the auth routes
export const registerController = async (req: Request, res: Response) =>{
     
    // Validate the request body using zod
            const schema = z.object({
                name: z.string().min(3).max(100),
                email: z.string(),
                password: passwordZodRules
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
            const userId = User.get('id'); // ✅ Ajoutez cette ligne

            const token = generateToken(userId)

            await addToken(token, 'activation', userId)

            await sendConfirmationEmail(email, token)

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


            if(User.get('status') !== 'active'){
                return res.status(400).json({message: 'Please confirm your email.'});
            }


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



export const confirmEmailController = async (req: Request, res: Response) => {
    const { token } = req.params;

    // 1. Vérifier que le token est bien une chaîne de caractères unique
    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'Token format is invalid.' });
    }

    // 2. Ici, TypeScript sait que `token` est strictement de type `string`
    const isTokenValid = verifyToken(token);
    if (!isTokenValid) {
        return res.status(400).json({ message: 'Invalid token or expired.' });
    }

    // Vous pouvez maintenant utiliser `token` en toute sécurité dans la suite de votre code
    // Exemple : await confirmUserEmail(token);

    const dbToken = await getToken(token);
    if (!dbToken || dbToken.get('type') !== 'activation') {
        return res.status(400).json({ message: 'Invalid token' });
    }

    const userId = dbToken.get('userId');

    await updateUser({
        id: userId,
        status: 'active',
    })

      // delete old tokens
     await deleteTokens(userId);

     return res.status(200).json({message : 'Email confirm.'});
}



export const forgotPasswordController = async (req: Request, res: Response) =>{
    
    // Validate the request body using zod
            const schema = z.object({
                email: z.string(),
                callbackUrl: z.string()
            });
        
            const parsedData = schema.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json({message: 'Invalid data', errors: parsedData.error})
            }

            const {email, callbackUrl} = parsedData.data;

            const User = await getUserByEmail(email);

            if(!User)
                return res.status(400).json({message: 'User not found.'});


             const userId = User.get('id'); // ✅ Ajoutez cette ligne

            // Generate token
            const token = generateToken(userId);

            // delete old tokens
            await deleteTokens(userId);

            // Save new token in database
            await addToken(token, 'reset', userId);
    
            // Send email
            await sendForgotPasswordEmail(email, token, callbackUrl);

            return res.status(200).json({message : 'Email sent.'});
}



export const resetPasswordController = async (req: Request, res: Response) =>{
    // Validate the request body using zod
            const schema = z.object({
                token: z.string(),
                password: passwordZodRules
            });
        
            const parsedData = schema.safeParse(req.body);
            if(!parsedData.success){
                return res.status(400).json({message: 'Invalid data', errors: parsedData.error})
            }

            const {token, password} = parsedData.data;


    // 1. Vérifier que le token est bien une chaîne de caractères unique
    if (typeof token !== 'string') {
        return res.status(400).json({ message: 'Token format is invalid.' });
    }

    // 2. Ici, TypeScript sait que `token` est strictement de type `string`
    const isTokenValid = verifyToken(token);
    if (!isTokenValid) {
        return res.status(400).json({ message: 'Invalid token or expired.' });
    }

    // Vous pouvez maintenant utiliser `token` en toute sécurité dans la suite de votre code
    // Exemple : await confirmUserEmail(token);
            

    const dbToken = await getToken(token);
    if (!dbToken || dbToken.get('type') !== 'reset') {
        return res.status(400).json({ message: 'Invalid token' });
    }

    const userId = dbToken.get('userId');


const encryptedPassword  = encryptPassword(password);

    await updateUser({
        id: userId,
        password: encryptedPassword,
    })

      // delete old tokens
     await deleteTokens(userId);


     return res.status(200).json({message : 'Password updated.'});

}