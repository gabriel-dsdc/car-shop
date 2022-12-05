import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import CarController from '../../../src/Controllers/CarController';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import { carsArray, validCar } from '../../utils/Mocks/CarsMock';
import { MONGO_ID } from '../../utils/Mocks/OtherMocks';

const TEST_NAME_RESPONSE = 'Verifica a resposta';
const TEST_NAME_ERROR = 'Verifica se o erro é tratado';

describe('Car camada CONTROLLER', function () {
  let req = {} as Request;
  let res = {} as Response;
  let next: NextFunction = () => {};

  beforeEach(function () {
    req = {
      body: validCar,
      params: { id: MONGO_ID },
    } as unknown as Request;
  
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      end: sinon.stub().returnsThis(),
      sendStatus: sinon.stub().returnsThis(),
    } as unknown as Response;
  
    next = sinon.spy();
  });

  describe('Registrar o carro', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      const carOutput: Car = new Car(req.body);
      sinon.stub(CarService.prototype, 'create').resolves(carOutput);
      // Act
      const controller = new CarController(req, res, next);
      await controller.create();
      // Assert
      expect((res.status as sinon.SinonStub).calledWith(201)).to.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carOutput)).to.equal(true);
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(CarService.prototype, 'create').throws();
      // Act
      const controller = new CarController(req, res, next);
      await controller.create();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });
  
  describe('Listar carros', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      const carOutput: Car[] = carsArray.map((car) => new Car(car));
      sinon.stub(CarService.prototype, 'findAll').resolves(carOutput);
      // Act
      const controller = new CarController(req, res, next);
      await controller.findAll();
      // Assert
      expect((res.status as sinon.SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carOutput)).to.equal(true);
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(CarService.prototype, 'findAll').throws();
      // Act
      const controller = new CarController(req, res, next);
      await controller.findAll();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });

  describe('Listar um carro pelo id', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      const carOutput: Car = new Car(validCar);
      sinon.stub(CarService.prototype, 'findById').resolves(carOutput);
      // Act
      const controller = new CarController(req, res, next);
      await controller.findById();
      // Assert
      expect((res.status as sinon.SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carOutput)).to.equal(true);
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(CarService.prototype, 'findById').throws();
      // Act
      const controller = new CarController(req, res, next);
      await controller.findById();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });

  describe('Atualizar um carro pelo id', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      const carInput = validCar;
      const carOutput: Car = new Car(carInput);
      sinon.stub(CarService.prototype, 'update').resolves(carOutput);
      // Act
      const controller = new CarController(req, res, next);
      await controller.update();
      // Assert
      expect((res.status as sinon.SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(carOutput)).to.equal(true);
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(CarService.prototype, 'update').throws();
      // Act
      const controller = new CarController(req, res, next);
      await controller.update();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });

  describe('Deletar um carro pelo id', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      sinon.stub(CarService.prototype, 'delete').resolves();
      // Act
      const controller = new CarController(req, res, next);
      // Assert
      expect(async () => controller.delete()).to.not.throw();
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(CarService.prototype, 'delete').throws();
      // Act
      const controller = new CarController(req, res, next);
      await controller.delete();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });

  afterEach(sinon.restore);
});
