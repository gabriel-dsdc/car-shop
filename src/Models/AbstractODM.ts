import { Model, model, models, Schema, UpdateQuery } from 'mongoose';

abstract class AbstractODM<T> {
  private _model: Model<T>;

  constructor(modelName: string, schema: Schema) {
    this._model = models[modelName] || model(modelName, schema);
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }

  public async findAll(): Promise<T[]> {
    return this._model.find().exec();
  }

  public async findById(id: string): Promise<T | null> {
    return this._model.findById(id).exec();
  }

  public async update(id: string, obj: UpdateQuery<T>): Promise<T | null> {
    return this._model.findByIdAndUpdate(id, obj, { new: true }).exec();
  }
}

export default AbstractODM;
