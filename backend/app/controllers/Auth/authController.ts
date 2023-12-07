import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import AuthService from '../../services/authService';
import { IAuthController, IUser } from '../../interfaces/IAuth';

function mapUserToIUsers(user: any): IUser {
  return {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: user.password,
    role: user.role,
  };
}

class AuthController implements IAuthController{
    constructor() {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(req: Request, res: Response) {
        try {
            let token = "";
            const { email, password } = req.body;
            const user = await AuthService.login(email, password);
            const mappedUser: IUser = mapUserToIUsers(user.user);
            
            if (user) {
                token = AuthService.generateToken(mappedUser);
            }

            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                token: token,
            });
        } catch (error: any) {
            console.log(error);
            res.status(401).json({
                success: false,
                message: 'Incorrect email or password',
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { first_name, last_name, email, password } = req.body;
            const encryptedPassword = await bcrypt.hash(password, 10);

            const userData = {
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                role: "user",
            };

            const createdUser = await AuthService.register(userData);

            res.status(200).json({
                success: true,
                message: 'User registered successfully',
                user: createdUser,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: 'User registration failed',
                error: error.message,
            });
        }
    }

    async registerAdmin(req: Request, res: Response) {
        try {
            const { first_name, last_name, email, password } = req.body;
            const encryptedPassword = await bcrypt.hash(password, 10);

            const userData = {
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                role: "admin",
            };

            const createdUser = await AuthService.register(userData);

            res.status(200).json({
                success: true,
                message: 'Admin User registered successfully',
                user: createdUser,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: 'Admin User registration failed',
                error: error.message,
            });
        }
    }
}

export default new AuthController();
