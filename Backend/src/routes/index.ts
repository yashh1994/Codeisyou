import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import userRoutes from './user.routes';
const router = Router();


router.use('/user', userRoutes);


export default router;
