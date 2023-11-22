import { IAuthModel, P_RegisterPayload, P_LoginPayload, IUser } from '../interfaces/IAuth';
import database from '../../config/database';

class User implements IAuthModel<IUser> {
  constructor() { }

  async login(payload: P_LoginPayload): Promise<IUser> {
    const user = await database.select('*').from('users').where({ email: payload.email }).first();
    if (!user) {
      throw new Error('User not found');
    }
    return user as IUser;
  }

  async register(payload: P_RegisterPayload): Promise<IUser> {
    if (!payload) throw new Error('Payload is missing');

    const { first_name, last_name, email, password, token } = payload;

    const [insertedId] = await database('users').insert({
      first_name,
      last_name,
      email,
      password,
      token
    }).returning('user_id');
    console.log('Inserted ID > ', insertedId);
    if (insertedId) {
      const createdUser = await database.select('*').from('users').where('user_id', insertedId.user_id).first();
      return createdUser as IUser;
    } else {
      throw new Error('No ID returned after insertion');
    }
  }
}

export default new User();
