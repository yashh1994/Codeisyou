import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const userRoute = Router();

userRoute.post('/login', userController.loginUser);
userRoute.post('/signup', userController.signupUser);
userRoute.get('/get-user-profile',userController.getUserProfile)
userRoute.post('/save-user-profile', userController.saveUserProfile);

export default userRoute;
