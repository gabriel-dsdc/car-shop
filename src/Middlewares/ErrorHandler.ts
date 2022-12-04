import { NextFunction, Request, Response } from 'express';
import CustomError from '../Utils/CustomError';

class ErrorHandler {
  public static handle(error: CustomError, _req: Request, res: Response, next: NextFunction) {
    if ('status' in error) {
      return res.status(error.status).json({ message: error.message });
    } 
    res.status(500).json({ message: error.message });
    next();
  }
}

export default ErrorHandler;
