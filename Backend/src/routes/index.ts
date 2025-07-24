import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import userRoute from './user.routes';

const router = Router();

router.get('/user', userRoute);



export default router;
