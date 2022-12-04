import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(car: IMotorcycle) {
    super(car);
    this.category = car.category;
    this.engineCapacity = car.engineCapacity;
  }

  public getCategory(): string { return this.category; }
  public getEngineCapacity(): number { return this.engineCapacity; }
}

export default Motorcycle;
