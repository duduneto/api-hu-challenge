import { Router } from 'express';

import AvenueController from './controllers/avenue';

const routes = Router();

routes.get('/avenue', AvenueController.index);
routes.post('/avenue', AvenueController.create);
routes.get('/avenue/:id', AvenueController.fetch);
routes.put('/avenue/:id', AvenueController.update);
routes.delete('/avenue/:id', AvenueController.delete);

export default routes;