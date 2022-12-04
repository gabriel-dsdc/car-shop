import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Registrar o carro', function () {
  it('Verifica o output', async function () {
    // Arrange
    const carInput: ICar = {
      model: 'Uno da Escada',
      year: 1960,
      color: 'Red',
      buyValue: 1500,
      doorsQty: 2,
      seatsQty: 2,
    };
    const carOutput: Car = new Car(carInput);
    sinon.stub(Model, 'create').resolves(carOutput);
    // Act
    const service = new CarService();
    const result = await service.create(carInput);
    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });
});
