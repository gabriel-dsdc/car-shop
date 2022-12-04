import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private _req: Request;
  private _res: Response;
  private _next: NextFunction;
  private _service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this._req = req;
    this._res = res;
    this._next = next;
    this._service = new CarService();
  }

  public async create() {
    try {
      const newCar = await this._service.create(this._req.body);
      this._res.status(201).json(newCar);
    } catch (error) {
      this._next(error);
    }
  }

  public async findAll() {
    try {
      const carsList = await this._service.findAll();
      this._res.status(200).json(carsList);
    } catch (error) {
      this._next(error);
    }
  }

  public async findById() {
    try {
      const car = await this._service.findById(this._req.params.id);
      this._res.status(200).json(car);
    } catch (error) {
      this._next(error);
    }
  }

  public async update() {
    try {
      const car = await this._service.update(this._req.params.id, this._req.body);
      this._res.status(200).json(car);
    } catch (error) {
      this._next(error);
    }
  }
}

export default CarController;
