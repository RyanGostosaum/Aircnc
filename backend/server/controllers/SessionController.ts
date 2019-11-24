import SessionRepository from '../repositories/SessionRepository';
import * as httpStatus from 'http-status';


const sendReponse = function (res, statusCode, data) {
  res.status(statusCode).json(data)
}

class SessionController {
  constructor() { }

  get(req, res) {
    SessionRepository
      .getAll()
      .then(user => sendReponse(res, httpStatus.OK, user))
      .catch(err => console.error.bind(console, `Error ${err}`))
  }

  create(req, res) {
    SessionRepository
      .create(req.body)
      .then(menus => sendReponse(res, httpStatus.OK, menus))
      .catch(err => console.error.bind(console, `Error ${err}`))
  }

  delete(req, res) {

    if (!req.params.id) {
      return sendReponse(res, httpStatus.NOT_FOUND, 'User not found!');
    }

    SessionRepository
      .delete(req.params.id)
      .then(user => sendReponse(res, httpStatus.OK, `User  ${user.name} deleted with success!`))
      .catch(err => console.error.bind(console, `Error ${err}`));
  }
  login(req, res) {
    SessionRepository
      .login(req.body)
      .then(menus => sendReponse(res, httpStatus.OK, menus))
      .catch(err => console.error.bind(console, `Error ${err}`))
  }
}

export default new SessionController();
