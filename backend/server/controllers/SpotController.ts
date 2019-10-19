import SpotRepository from '../repositories/SpotRepository';
import * as httpStatus from 'http-status';


const sendReponse = function (res, statusCode, data) {
    res.status(statusCode).json({ 'result': data })
}

class SpotController {
    constructor() { }

    create(req, res) {
        SpotRepository
            .create(req)
            .then(menus => sendReponse(res, httpStatus.OK, menus))
            .catch(err => console.error.bind(console, `Error ${err}`))
    }

}

export default new SpotController();
