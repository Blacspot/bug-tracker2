import type { Express } from "express";
import * as userController from "../controllers/user.controller";

const userRoutes = (app:Express) => {
    // POST /users/register - Create a new user
    app.post('/users/register', userController.createUserController);

    // POST /users/login - Login user
    app.post('/users/login', userController.loginUserController);

    // GET /users/profile - Get current user profile
    app.get('/users/profile', userController.getUserProfileController);

    // PUT /users/profile - Update user profile
    app.put('/users/profile', userController.updateUserProfileController);

    // PUT /users/change-password - Change password
    app.put('/users/change-password', userController.changePasswordController);
}

export default userRoutes;