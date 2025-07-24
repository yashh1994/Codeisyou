import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRoute = Router();


userRoute.post('/login', userController.loginUser);
userRoute.post('/signup', userController.signupUser);


export default userRoute;
