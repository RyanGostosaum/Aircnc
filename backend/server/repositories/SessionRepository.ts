import * as mongoose from 'mongoose';
import SessionSchema from '../schemas/SessionSchema';
import * as bcrypt from 'bcryptjs'
import Auth from "../config/auth";

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

    let { email, password } = user

    const userExist = await this.model.findOne({ 'email': email })

    if (userExist === null) {
      let hash = await bcrypt.hash(password, 8)

      user.password = hash

      return this.model.create(user);

    } else {
      return { message: 'Email is already in use', success: false }
    }
  }

  delete(_id) {
    return this.model.findByIdAndRemove(_id);
  }

  async login(user) {
    let { email, password } = user;

    let userResponse = await this.model.findOne({ 'email': email })

    if (userResponse !== null) {
      let passwordCheck = await bcrypt.compare(password, userResponse.password);
      if (passwordCheck === true) {
        let token = await Auth.create(userResponse);
        return {user: userResponse, token} 
      } else {
        return { message: "Incorrect password", success: false }
      }
    } else {
      return { message: "User not found", success: false }
    }
  }
}


export default new SessionRepository;
