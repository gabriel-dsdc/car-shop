import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private _model: CarODM;

  constructor() {
    this._model = new CarODM();
  }

  public async create(car: ICar): Promise<Car> {
    const newCar = await this._model.create(car);
    return new Car(newCar);
  }
}

export default CarService;
