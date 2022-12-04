import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status? = false;
  protected buyValue: number;

  constructor(vehicle: IVehicle) {
    this.id = vehicle.id;
    this.model = vehicle.model;
    this.year = vehicle.year;
    this.color = vehicle.color;
    this.status = vehicle.status;
    this.buyValue = vehicle.buyValue;
  }

  public getId(): string | undefined { return this.id; }
  public getModel(): string { return this.model; }
  public getYear(): number { return this.year; }
  public getColor(): string { return this.color; }
  public getStatus(): boolean | undefined { return this.status; }
  public getBuyValue(): number { return this.buyValue; }
}

export default Vehicle;
