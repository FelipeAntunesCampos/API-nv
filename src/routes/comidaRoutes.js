import express from 'express';
import * as controller from '../controllers/comidaController.js';

const router = express.Router();

router.post('/comida', controller.create);
router.get('/comida', controller.getAll);
router.get('/comida/:id', controller.getById);
router.put('/comida/:id', controller.update);
router.delete('/comida/:id', controller.remove);

export default router;