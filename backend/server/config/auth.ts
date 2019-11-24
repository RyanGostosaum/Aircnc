
import jwt = require("jsonwebtoken");

import { appConfig } from '../config/configs';

class Auth {

    constructor() { }

    validate(req, res, next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, appConfig.secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Auth error' });
                } else {

                    console.log('OK')
                    next();
                }
            });
        } else {
            console.log('403')
            return res.status(403).send({
                success: false,
                message: '403 - Forbidden'
            });
        }
    }

    async create(data) {
        let token = await jwt.sign({data}, appConfig.secret, { expiresIn: '100h' });        
        return token
    }
}

export default new Auth;