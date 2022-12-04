import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import CustomError from '../Utils/CustomError';

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

  public async findById(id: string) {
    if (!isValidObjectId(id)) { throw new CustomError(422, 'Invalid mongo id'); }
    const car = await this._model.findById(id);
    if (!car) { throw new CustomError(404, 'Car not found'); }
    return new Car(car);
  }
}

export default CarService;
