import express from 'express';
import * as housesController from '../controllers/houses.controller.js';

const housesRouter = express.Router();

housesRouter.get('/houses', housesController.getAllHouses);
housesRouter.get('/houses/:id', housesController.getHouseById);
export default housesRouter;