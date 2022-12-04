import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import CustomError from '../Utils/CustomError';

const NOT_FOUND = 'Motorcycle not found';
const INVALID_ID = 'Invalid mongo id';

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

  public async findById(id: string): Promise<Motorcycle> {
    if (!isValidObjectId(id)) { throw new CustomError(422, INVALID_ID); }
    const foundMotorcycle = await this._model.findById(id);
    if (!foundMotorcycle) { throw new CustomError(404, NOT_FOUND); }
    return new Motorcycle(foundMotorcycle);
  }

  public async update(id: string, motorcycle: IMotorcycle): Promise<Motorcycle> {
    if (!isValidObjectId(id)) { throw new CustomError(422, INVALID_ID); }
    const updatedMotorcycle = await this._model.update(id, motorcycle);
    if (!updatedMotorcycle) { throw new CustomError(404, NOT_FOUND); }
    return new Motorcycle(updatedMotorcycle);
  }

  public async delete(id: string) {
    if (!isValidObjectId(id)) { throw new CustomError(422, INVALID_ID); }
    const deletedMotorcycle = await this._model.delete(id);
    if (!deletedMotorcycle) { throw new CustomError(404, NOT_FOUND); }
  }
}

export default MotorcycleService;
