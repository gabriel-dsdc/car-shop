import { expect } from 'chai';
import { NextFunction, Request, Response } from 'express';
import sinon from 'sinon';
import MotorcycleController from '../../../src/Controllers/MotorcycleController';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcyclesArray, validMotorcycle } from '../../utils/Mocks/MotorcycleMock';
import { MONGO_ID } from '../../utils/Mocks/OtherMocks';

const TEST_NAME_RESPONSE = 'Verifica a resposta';
const TEST_NAME_ERROR = 'Verifica se o erro é tratado';

describe('Motorcycle camada CONTROLLER', function () {
  let req = {} as Request;
  let res = {} as Response;
  let next: NextFunction = () => {};

  beforeEach(function () {
    req = {
      body: validMotorcycle,
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

  describe('Registrar a moto', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      const motorcycleOutput: Motorcycle = new Motorcycle(req.body);
      sinon.stub(MotorcycleService.prototype, 'create').resolves(motorcycleOutput);
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.create();
      // Assert
      expect((res.status as sinon.SinonStub).calledWith(201)).to.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(motorcycleOutput)).to.equal(true);
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(MotorcycleService.prototype, 'create').throws();
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.create();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });
  
  describe('Listar motos', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      const motorcycleOutput: Motorcycle[] = motorcyclesArray
        .map((motorcycle) => new Motorcycle(motorcycle));
      sinon.stub(MotorcycleService.prototype, 'findAll').resolves(motorcycleOutput);
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.findAll();
      // Assert
      expect((res.status as sinon.SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(motorcycleOutput)).to.equal(true);
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(MotorcycleService.prototype, 'findAll').throws();
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.findAll();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });

  describe('Listar uma moto pelo id', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      const motorcycleOutput: Motorcycle = new Motorcycle(validMotorcycle);
      sinon.stub(MotorcycleService.prototype, 'findById').resolves(motorcycleOutput);
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.findById();
      // Assert
      expect((res.status as sinon.SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(motorcycleOutput)).to.equal(true);
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(MotorcycleService.prototype, 'findById').throws();
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.findById();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });

  describe('Atualizar uma moto pelo id', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      const carInput = validMotorcycle;
      const motorcycleOutput: Motorcycle = new Motorcycle(carInput);
      sinon.stub(MotorcycleService.prototype, 'update').resolves(motorcycleOutput);
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.update();
      // Assert
      expect((res.status as sinon.SinonStub).calledWith(200)).to.equal(true);
      expect((res.json as sinon.SinonStub).calledWith(motorcycleOutput)).to.equal(true);
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(MotorcycleService.prototype, 'update').throws();
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.update();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });

  describe('Deletar uma moto pelo id', function () {
    it(TEST_NAME_RESPONSE, async function () {
      // Arrange
      sinon.stub(MotorcycleService.prototype, 'delete').resolves();
      // Act
      const controller = new MotorcycleController(req, res, next);
      // Assert
      expect(async () => controller.delete()).to.not.throw();
    });
  
    it(TEST_NAME_ERROR, async function () {
      // Arrange
      sinon.stub(MotorcycleService.prototype, 'delete').throws();
      // Act
      const controller = new MotorcycleController(req, res, next);
      await controller.delete();
      // Assert
      expect((next as sinon.SinonSpy).calledWith(sinon.match.instanceOf(Error))).to.equal(true);
    });
  });

  afterEach(sinon.restore);
});
