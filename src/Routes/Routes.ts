import express from 'express';
import CarController from '../Controllers/CarController';

const routes = express.Router();

routes.post('/cars', (req, res, next) => new CarController(req, res, next).create());

export default routes;
