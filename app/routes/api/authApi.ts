import { Router } from 'express';

import AuthController from '../../controllers/Auth/authController';
import AuthMiddleware from '../../middlewares/Auth';

class AuthApi {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.post('/login', AuthController.login);

    /**
    * @openapi
    * '/api/user/register':
    *  post:
    *     tags:
    *     - Auth - User Registration
    *     summary: Register a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *              $ref: '#/components/schemas/CreateUserInput'
    *     responses:
    *      200:
    *        description: Success
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/CreateUserResponse'
    *      409:
    *        description: Conflict
    *      400:
    *        description: Bad request
    */
    this.router.post('/register', AuthController.register);

    
    this.router.post('/register-admin',
      AuthMiddleware.authorizeSuperAdmin,
      AuthController.registerAdmin);

    return this.router;
  }
}

export default new AuthApi();