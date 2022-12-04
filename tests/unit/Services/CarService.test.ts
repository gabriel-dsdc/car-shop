import { expect } from 'chai';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';
import { carsArray, validCar } from '../../utils/Mocks/CarsMock';
import {
  CAR_NOT_FOUND_ERROR,
  INVALID_ERROR,
  INVALID_MONGO_ID,
  MONGO_ID,
} from '../../utils/Mocks/OtherMocks';

describe('Car camada SERVICE', function () {
  describe('Registrar o carro', function () {
    it('Verifica o output', async function () {
      // Arrange
      const carInput = validCar;
      const carOutput: Car = new Car(carInput);
      sinon.stub(CarODM.prototype, 'create').resolves(carInput);
      // Act
      const service = new CarService();
      const result = await service.create(carInput);
      // Assert
      expect(result).to.be.deep.equal(carOutput);
    });
  });
  
  describe('Listar carros', function () {
    it('Verifica se os carros são listados corretamente', async function () {
      // Arrange
      const carOutput: Car[] = carsArray.map((car) => new Car(car));
      sinon.stub(CarODM.prototype, 'findAll').resolves(carsArray);
      // Act
      const service = new CarService();
      const result = await service.findAll();
      // Assert
      expect(result).to.be.deep.equal(carOutput);
    });
  });

  describe('Listar um carro pelo id', function () {
    it('Verifica se o carro é listado corretamente', async function () {
      // Arrange
      const carOutput: Car = new Car(validCar);
      sinon.stub(CarODM.prototype, 'findById').resolves(validCar);
      // Act
      const service = new CarService();
      const result = await service.findById(MONGO_ID);
      // Assert
      expect(result).to.be.deep.equal(carOutput);
    });

    it('Verifica com ID inválido', async function () {
      // Act
      try {
        const service = new CarService();
        await service.findById(INVALID_MONGO_ID);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(INVALID_ERROR);
      }
    });

    it('Verifica com carro inexistente', async function () {
      // Arrange
      sinon.stub(CarODM.prototype, 'findById').resolves(null);
      // Act
      try {
        const service = new CarService();
        await service.findById(MONGO_ID);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(CAR_NOT_FOUND_ERROR);
      }
    });
  });

  describe('Atualizar um carro pelo id', function () {
    it('Verifica se o carro é atualizado corretamente', async function () {
      // Arrange
      const carInput = validCar;
      const carOutput: Car = new Car(carInput);
      sinon.stub(CarODM.prototype, 'update').resolves(carInput);
      // Act
      const service = new CarService();
      const result = await service.update(MONGO_ID, carInput);
      // Assert
      expect(result).to.be.deep.equal(carOutput);
    });

    it('Verifica com ID inválido', async function () {
      // Arrange
      const carInput = validCar;
      // Act
      try {
        const service = new CarService();
        await service.update(INVALID_MONGO_ID, carInput);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(INVALID_ERROR);
      }
    });

    it('Verifica com carro inexistente', async function () {
      // Arrange
      const carInput = validCar;
      sinon.stub(CarODM.prototype, 'update').resolves(null);
      // Act
      try {
        const service = new CarService();
        await service.update(MONGO_ID, carInput);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(CAR_NOT_FOUND_ERROR);
      }
    });
  });

  afterEach(sinon.restore);
});
