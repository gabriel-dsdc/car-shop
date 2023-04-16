import request from 'supertest';
import sinon from 'sinon';
import app from '../../src/app';
import AbstractModel from '../../src/Models/AbstractODM';
import { carsArray, validCar } from '../utils/Mocks/CarsMock';
import { CAR_NOT_FOUND_ERROR, INTERNAL_SERVER_ERROR, INVALID_ERROR,
  INVALID_MONGO_ID, MONGO_ID } from '../utils/Mocks/OtherMocks';

const testDescriptions: { [statusCode: number]: (action: string) => string } = {
  200: (action) => `Should return status 200 when trying to ${action} a car(s)`,
  201: (action) => `Should return status 201 when trying to ${action} a car`,
  204: (action) => `Should return status 204 when trying to ${action} a car`,
  404: (action) => `Should return a 404 error when trying to ${action} a non-existent car`,
  422: (action) => `Should return a 422 error when trying to ${action} with invalid mongo id`,
  500: (action) => `Should return a 500 error when trying to ${action}`,
};

describe('Car Integration tests', function () {
  let createStub: sinon.SinonStub;
  let findAllStub: sinon.SinonStub;
  let findByIdStub: sinon.SinonStub;
  let updateStub: sinon.SinonStub;
  let deleteStub: sinon.SinonStub;

  beforeEach(function () {
    createStub = sinon.stub(AbstractModel.prototype, 'create');
    findAllStub = sinon.stub(AbstractModel.prototype, 'findAll');
    findByIdStub = sinon.stub(AbstractModel.prototype, 'findById');
    updateStub = sinon.stub(AbstractModel.prototype, 'update');
    deleteStub = sinon.stub(AbstractModel.prototype, 'delete');
  });

  describe('Car SUCCESS tests', function () {
    it(testDescriptions[201]('POST'), async function () {
      // Arrange
      createStub.resolves(validCar);
      // Act
      await request(app).post('/cars').send(validCar)
        .set('Accept', 'application/json')
      // Assert
        .expect('Content-Type', /json/)
        .expect(201, validCar);
    });

    it(testDescriptions[200]('GET'), async function () {
      // Arrange
      findAllStub.resolves(carsArray);
      // Act & Assert
      await request(app).get('/cars').expect(200, carsArray);
    });

    it(testDescriptions[200]('GET'), async function () {
      // Arrange
      findByIdStub.resolves(validCar);
      // Act & Assert
      await request(app).get(`/cars/${MONGO_ID}`).expect(200, validCar);
    });

    it(testDescriptions[200]('UPDATE'), async function () {
      // Arrange
      updateStub.resolves({ ...validCar, model: 'Uno' });
      // Act
      await request(app).put(`/cars/${MONGO_ID}`).send(validCar)
      // Assert
        .expect(200, { ...validCar, model: 'Uno' });
    });

    it(testDescriptions[204]('DELETE'), async function () {
      // Arrange
      deleteStub.resolves(validCar);
      // Act & Assert
      await request(app).delete(`/cars/${MONGO_ID}`).expect(204, {});
    });
  });

  describe('Car ERROR tests', function () {
    it(testDescriptions[500]('POST'), async function () {
      // Arrange
      createStub.rejects(new Error(INTERNAL_SERVER_ERROR));
      // Act
      await request(app).post('/cars').send(validCar)
        .set('Accept', 'application/json')
      // Assert
        .expect('Content-Type', /json/)
        .expect(500, { message: INTERNAL_SERVER_ERROR });
    });

    it(testDescriptions[500]('GET'), async function () {
      // Arrange
      findAllStub.rejects(new Error(INTERNAL_SERVER_ERROR));
      // Act & Assert
      await request(app).get('/cars').expect(500, { message: INTERNAL_SERVER_ERROR });
    });

    it(testDescriptions[422]('GET'), async function () {
      // Act & Assert
      await request(app).get(`/cars/${INVALID_MONGO_ID}`).expect(422, { message: INVALID_ERROR });
    });

    it(testDescriptions[404]('GET'), async function () {
      // Arrange
      findByIdStub.resolves(null);
      // Act & Assert
      await request(app).get(`/cars/${MONGO_ID}`).expect(404, { message: CAR_NOT_FOUND_ERROR });
    });

    it(testDescriptions[422]('UPDATE'), async function () {
      // Act
      await request(app).put(`/cars/${INVALID_MONGO_ID}`).send(validCar)
      // Assert
        .expect(422, { message: INVALID_ERROR });
    });

    it(testDescriptions[404]('UPDATE'), async function () {
      // Arrange
      updateStub.resolves(null);
      // Act
      await request(app).put(`/cars/${MONGO_ID}`).send(validCar)
      // Assert
        .expect(404, { message: CAR_NOT_FOUND_ERROR });
    });

    it(testDescriptions[422]('DELETE'), async function () {
      // Arrange
      deleteStub.resolves(validCar);
      // Act
      await request(app).delete(`/cars/${INVALID_MONGO_ID}`)
      // Assert
        .expect(422, { message: INVALID_ERROR });
    });

    it(testDescriptions[404]('DELETE'), async function () {
      // Arrange
      deleteStub.resolves(null);
      // Act & Assert
      await request(app).delete(`/cars/${MONGO_ID}`).expect(404, { message: CAR_NOT_FOUND_ERROR });
    });
  });

  afterEach(sinon.restore);
});
