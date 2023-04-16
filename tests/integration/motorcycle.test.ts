import request from 'supertest';
import sinon from 'sinon';
import app from '../../src/app';
import AbstractModel from '../../src/Models/AbstractODM';
import { motorcyclesArray, validMotorcycle } from '../utils/Mocks/MotorcycleMock';
import { INTERNAL_SERVER_ERROR, INVALID_ERROR, INVALID_MONGO_ID, 
  MONGO_ID, MOTORCYCLE_NOT_FOUND_ERROR } from '../utils/Mocks/OtherMocks';

const motorcycles = '/motorcycles';
const testDescriptions: { [statusCode: number]: (action: string) => string } = {
  200: (action) => `Should return status 200 when trying to ${action} a motorcycle(s)`,
  201: (action) => `Should return status 201 when trying to ${action} a motorcycle`,
  204: (action) => `Should return status 204 when trying to ${action} a motorcycle`,
  404: (action) => `Should return a 404 error when trying to ${action} a non-existent motorcycle`,
  422: (action) => `Should return a 422 error when trying to ${action} with invalid mongo id`,
  500: (action) => `Should return a 500 error when trying to ${action}`,
};

describe('Motorcycle Integration tests', function () {
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

  describe('Motorcycles SUCCESS tests', function () {
    it(testDescriptions[201]('POST'), async function () {
      // Arrange
      createStub.resolves(validMotorcycle);
      // Act
      await request(app).post(motorcycles).send(validMotorcycle)
        .set('Accept', 'application/json')
      // Assert
        .expect('Content-Type', /json/)
        .expect(201, validMotorcycle);
    });

    it(testDescriptions[200]('GET'), async function () {
      // Arrange
      findAllStub.resolves(motorcyclesArray);
      // Act & Assert
      await request(app).get(motorcycles).expect(200, motorcyclesArray);
    });

    it(testDescriptions[200]('GET'), async function () {
      // Arrange
      findByIdStub.resolves(validMotorcycle);
      // Act & Assert
      await request(app).get(`${motorcycles}/${MONGO_ID}`).expect(200, validMotorcycle);
    });

    it(testDescriptions[200]('UPDATE'), async function () {
      // Arrange
      updateStub.resolves({ ...validMotorcycle, color: 'Blue' });
      // Act
      await request(app).put(`${motorcycles}/${MONGO_ID}`).send(validMotorcycle)
      // Assert
        .expect(200, { ...validMotorcycle, color: 'Blue' });
    });

    it(testDescriptions[204]('DELETE'), async function () {
      // Arrange
      deleteStub.resolves(validMotorcycle);
      // Act & Assert
      await request(app).delete(`${motorcycles}/${MONGO_ID}`).expect(204, {});
    });
  });

  describe('Motorcycles ERROR tests', function () {
    it(testDescriptions[500]('POST'), async function () {
      // Arrange
      createStub.rejects(new Error(INTERNAL_SERVER_ERROR));
      // Act
      await request(app).post(motorcycles).send(validMotorcycle)
        .set('Accept', 'application/json')
      // Assert
        .expect('Content-Type', /json/)
        .expect(500, { message: INTERNAL_SERVER_ERROR });
    });

    it(testDescriptions[500]('GET'), async function () {
      // Arrange
      findAllStub.rejects(new Error(INTERNAL_SERVER_ERROR));
      // Act & Assert
      await request(app).get(motorcycles).expect(500, { message: INTERNAL_SERVER_ERROR });
    });

    it(testDescriptions[422]('GET'), async function () {
      // Arrange
      findByIdStub.resolves(validMotorcycle);
      // Act
      await request(app).get(`${motorcycles}/${INVALID_MONGO_ID}`)
      // Assert
        .expect(422, { message: INVALID_ERROR });
    });

    it(testDescriptions[404]('GET'), async function () {
      // Arrange
      findByIdStub.resolves(null);
      // Act
      await request(app).get(`${motorcycles}/${MONGO_ID}`)
      // Assert
        .expect(404, { message: MOTORCYCLE_NOT_FOUND_ERROR });
    });

    it(testDescriptions[422]('UPDATE'), async function () {
      // Arrange
      updateStub.resolves({ ...validMotorcycle, color: 'Blue' });
      // Act
      await request(app).put(`${motorcycles}/${INVALID_MONGO_ID}`).send(validMotorcycle)
      // Assert
        .expect(422, { message: INVALID_ERROR });
    });

    it(testDescriptions[404]('UPDATE'), async function () {
      // Arrange
      updateStub.resolves(null);
      // Act
      await request(app).put(`${motorcycles}/${MONGO_ID}`).send(validMotorcycle)
      // Assert
        .expect(404, { message: MOTORCYCLE_NOT_FOUND_ERROR });
    });

    it(testDescriptions[422]('DELETE'), async function () {
      // Arrange
      deleteStub.resolves(validMotorcycle);
      // Act
      await request(app).delete(`${motorcycles}/${INVALID_MONGO_ID}`)
      // Assert
        .expect(422, { message: INVALID_ERROR });
    });

    it(testDescriptions[404]('DELETE'), async function () {
      // Arrange
      deleteStub.resolves(null);
      // Act
      await request(app).delete(`${motorcycles}/${MONGO_ID}`)
      // Assert
        .expect(404, { message: MOTORCYCLE_NOT_FOUND_ERROR });
    });
  });

  afterEach(sinon.restore);
});
