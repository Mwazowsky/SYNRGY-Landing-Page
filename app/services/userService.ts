import { IAuthModel, P_RegisterPayload, P_LoginPayload, IUser } from '../interfaces/IAuth';
import User from '../models/userModel'; // Import the User model using database operations

class UserModel implements IAuthModel<IUser> {
  constructor() {}

  async login(payload: P_LoginPayload): Promise<IUser> {
    const { email, password } = payload;
    const user = await User.login({ email, password });
    if (!user) {
      throw new Error('User not found');
    }
    return user as IUser;
  }

  async register(payload: P_RegisterPayload): Promise<IUser> {
    if (!payload) throw new Error('Payload is missing');

    const { first_name, last_name, email, password, token } = payload;

    const createdUser = await User.register({
      first_name,
      last_name,
      email,
      password,
      token
    });

    if (!createdUser) {
      throw new Error('No user created');
    }

    return createdUser as IUser;
  }
}

export default new UserModel();
