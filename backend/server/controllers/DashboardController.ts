import DashboardRepository from '../repositories/DashboardRepository';
import * as httpStatus from 'http-status';


const sendReponse = function (res, statusCode, data) {
    res.status(statusCode).json(data)
}

class DashboardController {
    constructor() { }

    get(req, res) {
        DashboardRepository
            .show(req.headers)
            .then(response => sendReponse(res, httpStatus.OK, response))
            .catch(err => console.error.bind(console, `Error ${err}`))
    }
}

export default new DashboardController();
