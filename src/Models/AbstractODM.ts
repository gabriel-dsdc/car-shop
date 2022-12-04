import { Model, model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  private _model: Model<T>;

  constructor(modelName: string, schema: Schema) {
    this._model = models[modelName] || model(modelName, schema);
  }

  public async create(obj: T): Promise<T> {
    return this._model.create({ ...obj });
  }
}

export default AbstractODM;
