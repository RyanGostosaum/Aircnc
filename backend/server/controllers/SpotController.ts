import SpotRepository from '../repositories/SpotRepository';
import * as httpStatus from 'http-status';


const sendReponse = function (res, statusCode, data) {
    res.status(statusCode).json({ 'result': data })
}

class SpotController {
    constructor() { }

    get(req, res) {
        SpotRepository
            .getAll()
            .then(user => sendReponse(res, httpStatus.OK, user))
            .catch(err => console.error.bind(console, `Error ${err}`))
    }

    getById(req, res) {
        const _id = { id: req.params.id };

        if (!_id) {
            sendReponse(res, httpStatus.OK, 'user not found!');
        } else {
            SpotRepository
                .getById(req.params.id)
                .then(programs => sendReponse(res, httpStatus.OK, programs))
                .catch(err => console.error.bind(console, `Error ${err}`))
        }
    }

    create(req, res) {
        console.log(req.body);
        console.log(req.files);

        SpotRepository
            .create(req.body)
            .then(menus => sendReponse(res, httpStatus.OK, menus))
            .catch(err => console.error.bind(console, `Error ${err}`))
    }

    update(req, res) {
        const _id = { id: req.params.id };

        if (req.body.length == 0) {
            return sendReponse(res, httpStatus.NOT_FOUND, 'Not found!');
        }

        SpotRepository
            .update(_id, req.body)
            .then(user => sendReponse(res, httpStatus.OK, user))
            .catch(err => console.error.bind(console, `Error ${err}`));

    }

    delete(req, res) {

        if (!req.params.id) {
            return sendReponse(res, httpStatus.NOT_FOUND, 'Not found!');
        }

        SpotRepository
            .delete(req.params.id)
            .then(user => sendReponse(res, httpStatus.OK, `User  ${user.name} deleted with success!`))
            .catch(err => console.error.bind(console, `Error ${err}`));
    }

}

export default new SpotController();
