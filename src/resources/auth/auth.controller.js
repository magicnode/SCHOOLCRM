import httpStatus from 'http-status'
import JWT from 'jsonwebtoken'

import APIError from '../../helpers/apierror.helper'
import User from '../../models/user.model'
import _crypto from '../../helpers/crypto.helper'

import config from '../../../config/env'

const jwtsecret = config.jwtSecret

async function create(req, res, next) {
    try {
        let { name, pwd } = req.body
        let query = {name}
        let user = await User.findOne({name}).populate('lab')
        if (!user) {
            user = await User.findOne({email: name}).populate('lab')
            if (!user) {
              return res.send('no such user')
            }
        }
        const truepwd = await _crypto.decipherpromise(user.hashed_password, user.salt)
        if (truepwd !== pwd) {
            return res.send('pwd is wrong!')
        }
        const jwt_token = {
            user_id: user._id,
            name: user.name,
            username: user.username
        }
        const token = JWT.sign(jwt_token, jwtsecret, {
            expiresIn: '2000h'
        })
        return res.json({token, user})
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err);
    }
}

function check(req, res, next) {
    const params = req.params
    User.findOneAndRemove(params)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

export default {
    create,
    check
}