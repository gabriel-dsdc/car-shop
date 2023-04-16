import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CustomError from '../Utils/CustomError';

const NOT_FOUND = 'Car not found';
const INVALID_ID = 'Invalid mongo id';

class CarService {
  private _model: CarODM;

  constructor() {
    this._model = new CarODM();
  }

  public async create(car: ICar): Promise<Car> {
    const newCar = await this._model.create(car);
    return new Car(newCar);
  }

  public async findAll(): Promise<Car[]> {
    const carsList = await this._model.findAll();
    return carsList.map((car) => new Car(car));
  }

  public async findById(id: string): Promise<Car> {
    if (!isValidObjectId(id)) { throw new CustomError(INVALID_ID, 422); }
    const foundCar = await this._model.findById(id);
    if (!foundCar) { throw new CustomError(NOT_FOUND, 404); }
    return new Car(foundCar);
  }

  public async update(id: string, car: ICar): Promise<Car> {
    if (!isValidObjectId(id)) { throw new CustomError(INVALID_ID, 422); }
    const updatedCar = await this._model.update(id, car);
    if (!updatedCar) { throw new CustomError(NOT_FOUND, 404); }
    return new Car(updatedCar);
  }

  public async delete(id: string) {
    if (!isValidObjectId(id)) { throw new CustomError(INVALID_ID, 422); }
    const deletedCar = await this._model.delete(id);
    if (!deletedCar) { throw new CustomError(NOT_FOUND, 404); }
  }
}

export default CarService;
