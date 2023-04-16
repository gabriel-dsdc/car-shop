import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import connectToDatabase from '../../../src/Models/Connection';

describe('Conexão com o Banco de Dados', function () {
  it('Deve conectar ao banco de dados com sucesso', async function () {
    // Arrange
    const mockMongooseConnect = sinon.stub(mongoose, 'connect').resolves();
    // Act
    await connectToDatabase();
    // Assert
    expect(mockMongooseConnect.calledOnce).to.be.equal(true);
    // Clean up
    mockMongooseConnect.restore();
  });
});
