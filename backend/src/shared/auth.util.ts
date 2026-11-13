// configuration of authentication with JWT

import jwt from 'jsonwebtoken';
import { user } from '../models/user';
import { Request, Response, NextFunction } from 'express';
const secretKey = process.env.JWT_SECRET!; // Replace with my secret key in production


// Generation du token
export function generateToken(userId: number): string{
  const payLoad = { userId};
  const token = jwt.sign(payLoad, secretKey, { 
    expiresIn: '1h' 
  });

  return token;

}


// verification du token
export function verifyToken(token: string){
  try {
    const decoded = jwt.verify(token, secretKey);

    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }

}


// Authentification du token
export function authenticateJWT(req: Request, res: Response, next: NextFunction){
  const token = req.header('Authorization')?.replace('Bearer', '');
  if(!token){
    return res.status(401).json({ message: 'Token not provided' });
  }

  const decoded = verifyToken(token);
  if(!decoded){
    return res.status(401).json({ message: 'Invalid token' });
  }

user.findByPk((decoded as any).userId).then((User)=>{
if(User){
    (req as any).user = User;
  }
  else{
    return res.status(401).json({message: 'user not found'});
  }

  next();
  });
  
}

