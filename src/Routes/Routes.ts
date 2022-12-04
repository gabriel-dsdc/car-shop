import express from 'express';
import CarController from '../Controllers/CarController';

const routes = express.Router();

routes.post('/cars', (req, res, next) => new CarController(req, res, next).create());
routes.get('/cars', (req, res, next) => new CarController(req, res, next).findAll());
routes.get('/cars/:id', (req, res, next) => new CarController(req, res, next).findById());
routes.put('/cars/:id', (req, res, next) => new CarController(req, res, next).update());

export default routes;
