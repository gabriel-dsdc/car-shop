import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private _model: MotorcycleODM;

  constructor() {
    this._model = new MotorcycleODM();
  }

  public async create(motorcycle: IMotorcycle): Promise<Motorcycle> {
    const newMotorcycle = await this._model.create(motorcycle);
    return new Motorcycle(newMotorcycle);
  }
}

export default MotorcycleService;
