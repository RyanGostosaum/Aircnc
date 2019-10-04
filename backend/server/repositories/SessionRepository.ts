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

  getById(_id) {
    return this.model.findById(_id);
  }

  async create(user) {
    const userExists = await this.model.findOne({ 'email': user.email })
    if (!userExists) {
      return this.model.create(user)
    }
  }

  update(_id, user) {
    const updateUser = (<any>Object).assign({}, user);
    return this.model.findByIdAndUpdate(_id, updateUser, { new: true });
  }

  delete(_id) {
    return this.model.findByIdAndRemove(_id);
  }

}


export default new SessionRepository;
