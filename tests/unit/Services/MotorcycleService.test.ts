import { expect } from 'chai';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import AbstractODM from '../../../src/Models/AbstractODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { motorcyclesArray, validMotorcycle } from '../../utils/Mocks/MotorcycleMock';
import {
  INVALID_ERROR,
  INVALID_MONGO_ID,
  MONGO_ID,
  MOTORCYCLE_NOT_FOUND_ERROR,
} from '../../utils/Mocks/OtherMocks';

const TEST_NAME_INVALID_ID = 'Verifica com ID inválido';
const TEST_NAME_NOT_FOUND = 'Verifica com moto inexistente';

describe('Motorcycle camada SERVICE', function () {
  describe('Registrar a moto', function () {
    it('Verifica o output', async function () {
      // Arrange
      const motorcycleInput = validMotorcycle;
      const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);
      sinon.stub(AbstractODM.prototype, 'create').resolves(motorcycleInput);
      // Act
      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput);
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });

  describe('Listar motos', function () {
    it('Verifica se as motos são listadas corretamente', async function () {
      // Arrange
      const motorcycleOutput: Motorcycle[] = motorcyclesArray
        .map((motorcycle) => new Motorcycle(motorcycle));
      sinon.stub(AbstractODM.prototype, 'findAll').resolves(motorcyclesArray);
      // Act
      const service = new MotorcycleService();
      const result = await service.findAll();
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });
  });

  describe('Listar uma moto pelo id', function () {
    it('Verifica se a moto é listada corretamente', async function () {
      // Arrange
      const motorcycleOutput: Motorcycle = new Motorcycle(validMotorcycle);
      sinon.stub(AbstractODM.prototype, 'findById').resolves(validMotorcycle);
      // Act
      const service = new MotorcycleService();
      const result = await service.findById(MONGO_ID);
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it(TEST_NAME_INVALID_ID, async function () {
      // Act
      try {
        const service = new MotorcycleService();
        await service.findById(INVALID_MONGO_ID);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(INVALID_ERROR);
      }
    });

    it(TEST_NAME_NOT_FOUND, async function () {
      // Arrange
      sinon.stub(AbstractODM.prototype, 'findById').resolves(null);
      // Act
      try {
        const service = new MotorcycleService();
        await service.findById(MONGO_ID);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND_ERROR);
      }
    });
  });

  describe('Atualizar uma moto pelo id', function () {
    it('Verifica se a moto é atualizada corretamente', async function () {
      // Arrange
      const motorcycleInput = validMotorcycle;
      const motorcycleOutput: Motorcycle = new Motorcycle(motorcycleInput);
      sinon.stub(AbstractODM.prototype, 'update').resolves(motorcycleInput);
      // Act
      const service = new MotorcycleService();
      const result = await service.update(MONGO_ID, motorcycleInput);
      // Assert
      expect(result).to.be.deep.equal(motorcycleOutput);
    });

    it(TEST_NAME_INVALID_ID, async function () {
      // Arrange
      const motorcycleInput = validMotorcycle;
      // Act
      try {
        const service = new MotorcycleService();
        await service.update(INVALID_MONGO_ID, motorcycleInput);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(INVALID_ERROR);
      }
    });

    it(TEST_NAME_NOT_FOUND, async function () {
      // Arrange
      const motorcycleInput = validMotorcycle;
      sinon.stub(AbstractODM.prototype, 'update').resolves(null);
      // Act
      try {
        const service = new MotorcycleService();
        await service.update(MONGO_ID, motorcycleInput);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND_ERROR);
      }
    });
  });

  describe('Deletar uma moto pelo id', function () {
    it('Verifica se a moto é deletada corretamente', async function () {
      // Arrange
      const motorcycleInput = validMotorcycle;
      sinon.stub(AbstractODM.prototype, 'delete').resolves(motorcycleInput);
      // Act
      const service = new MotorcycleService();
      // Assert
      expect(async () => service.delete(MONGO_ID)).to.not.throw();
    });

    it(TEST_NAME_INVALID_ID, async function () {
      // Act
      try {
        const service = new MotorcycleService();
        await service.delete(INVALID_MONGO_ID);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(INVALID_ERROR);
      }
    });

    it(TEST_NAME_NOT_FOUND, async function () {
      // Arrange
      sinon.stub(AbstractODM.prototype, 'delete').resolves(null);
      // Act
      try {
        const service = new MotorcycleService();
        await service.delete(MONGO_ID);
      } catch (error) {
      // Assert
        expect((error as Error).message).to.be.equal(MOTORCYCLE_NOT_FOUND_ERROR);
      }
    });
  });

  afterEach(sinon.restore);
});
