import { expect } from 'chai';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { validMotorcycle } from '../../utils/Mocks/MotorcycleMock';

describe('Motorcycle camada SERVICE', function () {
  describe('Registrar a moto', function () {
    it('Verifica o output', async function () {
      // Arrange
      const motorcycleInput = validMotorcycle;
      const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);
      sinon.stub(MotorcycleODM.prototype, 'create').resolves(motorcycleInput);
      // Act
      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput);
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });

  afterEach(sinon.restore);
});
