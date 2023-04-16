import { expect } from 'chai';
import { Document, Model, Query } from 'mongoose';
import sinon from 'sinon';
import CarODM from '../../../src/Models/CarODM';
import { carsArray, validCar } from '../../utils/Mocks/CarsMock';

describe('Camada MODEL abstrata', function () {
  it('create', async function () {
    // Arrange
    sinon.stub(Model, 'create').resolves(validCar);
    // Act
    const model = new CarODM();
    const result = await model.create(validCar);
    // Assert
    expect(result).to.be.deep.equal(validCar);
  });

  it('findAll', async function () {
    // Arrange
    sinon.stub(Model, 'find').returns({
      exec: sinon.stub().resolves(carsArray),
    } as unknown as Query<Document[], Document>);
    // Act
    const model = new CarODM();
    const result = await model.findAll();
    // Assert
    expect(result).to.be.deep.equal(carsArray);
  });

  it('findById', async function () {
    // Arrange
    sinon.stub(Model, 'findById').returns({
      exec: sinon.stub().resolves(validCar),
    } as unknown as Query<Document[], Document>);
    // Act
    const model = new CarODM();
    const result = await model.findById('1');
    // Assert
    expect(result).to.be.deep.equal(validCar);
  });

  it('update', async function () {
    // Arrange
    sinon.stub(Model, 'findByIdAndUpdate').returns({
      exec: sinon.stub().resolves({ ...validCar, model: 'Uno' }),
    } as unknown as Query<Document[], Document>);
    // Act
    const model = new CarODM();
    const result = await model.update('1', { ...validCar, model: 'Uno' });
    // Assert
    expect(result?.model).to.be.deep.equal('Uno');
  });
  it('delete', async function () {
    // Arrange
    sinon.stub(Model, 'findByIdAndDelete').returns({
      exec: sinon.stub().resolves(validCar),
    } as unknown as Query<Document[], Document>);
    // Act
    const model = new CarODM();
    const result = await model.delete('1');
    // Assert
    expect(result).to.be.deep.equal(validCar);
  });

  afterEach(sinon.restore);
});
