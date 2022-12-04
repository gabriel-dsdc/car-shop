import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import CustomError from '../Utils/CustomError';

class MotorcycleService {
  private _model: MotorcycleODM;

  constructor() {
    this._model = new MotorcycleODM();
  }

  public async create(motorcycle: IMotorcycle): Promise<Motorcycle> {
    const newMotorcycle = await this._model.create(motorcycle);
    return new Motorcycle(newMotorcycle);
  }

  public async findAll(): Promise<Motorcycle[]> {
    const motorcyclesList = await this._model.findAll();
    return motorcyclesList.map((motorcycle) => new Motorcycle(motorcycle));
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) { throw new CustomError(422, 'Invalid mongo id'); }
    const foundMotorcycle = await this._model.findById(id);
    if (!foundMotorcycle) { throw new CustomError(404, 'Motorcycle not found'); }
    return new Motorcycle(foundMotorcycle);
  }
}

export default MotorcycleService;
