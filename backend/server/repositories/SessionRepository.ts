import * as mongoose from 'mongoose';
import SessionSchema from '../schemas/SessionSchema';

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

    const { email } = user
    let userExists = await this.model.findOne({ 'email': email })
    if (!userExists) {
      return this.model.create(user)
    }
  }

  delete(_id) {
    return this.model.findByIdAndRemove(_id);
  }

}


export default new SessionRepository;
