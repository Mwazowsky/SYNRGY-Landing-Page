import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Ensure you import JWT

import User from '../../models/userModel';
import { IAuthController, P_RegisterPayload, P_LoginPayload, IUser } from '../../interfaces/IAuth';

const PRIVATE_KEY = 'your_private_key'; // Replace with your private key

class AuthController implements IAuthController {
    constructor() { }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            let encryptedPassword = await bcrypt.hash(password, 10);

            const payload: P_LoginPayload = {
                email: email.toLowerCase(),
                password: encryptedPassword,
            };

            let user = await User.login(payload);
            let isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    error: "incorrect email or password",
                });
            }

            const token = jwt.sign({ email: user.email }, PRIVATE_KEY);
            user.token = token;

            res.status(200).json({
                success: true,
                message: "User registered successfully",
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "User registration failed",
                error,
            });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { first_name, last_name, email, password } = req.body;
            console.log(req.body);
            let encryptedPassword = await bcrypt.hash(password, 10);

            const payload: P_RegisterPayload = {
                first_name,
                last_name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                token: ''
            };

            const createdUser: IUser = await User.register(payload);

            res.status(200).json({
                success: true,
                message: "User registered successfully",
                user: createdUser,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "User registration failed",
                error,
            });
        }
    }
}

export default new AuthController();