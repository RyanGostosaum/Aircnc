import * as mongoose from 'mongoose';
import SessionSchema from '../schemas/SessionSchema';
import {hash} from 'bcrypt';

class SessionRepository {
  private model;

  constructor() {
    this.model = mongoose.model('Session', SessionSchema);
  }

  getAll() {
    return this.model.find({});
  }

  async create(user) {
    console.log('[SESSION CONTROLLER]: creating session');

    const { email, password } = user

    let userExists = await this.model.findOne({ 'email': email })
    if (!userExists) {
      let crypto: string = await hash(password, 10)

      user.password = crypto

      console.log(user);
      
      // return this.model.create(user)
    }
  }

  delete(_id) {
    return this.model.findByIdAndRemove(_id);
  }

}


export default new SessionRepository;
