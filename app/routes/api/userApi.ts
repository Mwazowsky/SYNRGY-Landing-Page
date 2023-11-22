import { Router } from 'express';

import AuthController from '../../controllers/Users/authController';

class AuthApi {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  routes() {
    this.router.post('/login', AuthController.login);
    this.router.post('/register', AuthController.register);

    return this.router;
  }
}

export default new AuthApi();