import { Model, model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  private _model: Model<T>;

  constructor(modelName: string, schema: Schema) {
    this._model = models[modelName] || model(modelName, schema);
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this._model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this._model.findOne({ _id: id });
  }
}

export default AbstractODM;
