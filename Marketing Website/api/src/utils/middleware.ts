import { Request, Response, NextFunction } from 'express';
import { User } from '../types/users';

interface UserDocument extends User, Document {}

interface CustomRequest extends Request {
    token?: string;
    user?: UserDocument;
  }

const tokenExtractor = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorization = req.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7);
    } else {
      req.token = undefined;
    }
    console.log('Token in tokenExtractor:', req.token);
    next();
  };

  export {tokenExtractor, CustomRequest};