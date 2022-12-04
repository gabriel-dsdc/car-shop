import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private _service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._service = new MotorcycleService();
  }

  public async create() {
    try {
      const newMotorcycle = await this._service.create(this._req.body);
      this._res.status(201).json(newMotorcycle);
    } catch (error) {
      this._next(error);
    }
  }
}

export default MotorcycleController;
