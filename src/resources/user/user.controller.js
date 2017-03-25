import httpStatus from 'http-status';
import JWT from 'jsonwebtoken'

import User from '../../models/user.model'
import UserCharacter from '../../models/user_character.model'

import APIError from '../../helpers/apierror.helper';
import _crypto from '../../helpers/crypto.helper'
import _mongo from '../../helpers/mongo.helper'
import config from '../../../config/env'

const jwtsecret = config.jwtSecret

function index(req, res, next) {
    const query = req.query;
    User.list({ query })
        .then(result => {
            if (result.length === 0) {
                let err = new APIError('not found', httpStatus.NOT_FOUND);
                return next(err);
            }
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

/**
 * @api {get} /users Request user info
 * @apiName CreateUser
 * @apiGroup user
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 */

async function create(req, res, next) {
    try {
        let { name, pwd } = req.body
        let query = {name}
        let user = await User.findOne(query)
        if (user) {
            return res.send('this name is already token')
        }
        let salt = new Date().getTime().toString()
        pwd = await _crypto.cipherpromise(pwd, salt)
        let doc = {name, hashed_password: pwd, salt}
        user = await _mongo.uniqSave(query, doc, User)
        const jwt_token = {
            user_id: user._id,
            name: user.name
        }
        const token = await JWT.sign(jwt_token, jwtsecret, {
            expiresIn: '2000h'
        })
        const backData = {
            token,
            name: user.name,
            username: user.username
        }
        return res.json(backData)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err);
    }
}

function show(req, res, next) {
    const query = req.params;
    User.get({ query })
        .then(result => {
            return res.send(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function update(req, res, next) {
    const params = req.params;
    const body = req.body;
    User.findOneAndUpdate(params, body)
        .then(result => {
            return res.json(result)
        })
        .catch(err => {
            console.error(err)
            err = new APIError(err.message, httpStatus.NOT_FOUND, true);
            return next(err);
        })
}

function destroy(req, res, next) {
    const params = req.params;
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

async function getCharacter (req, res, next) {
  try {
      const user = req.params._id
      const UC = await UserCharacter.find({user},
              {id:0, user:0, CreateAt:0}).populate('character')
      const characters = await UC.map(function(item){
          let chara = item.character
          return chara 
      })
      return res.json(characters)
  } catch (err) {
      console.error(err)
      err = new APIError(err.message, httpStatus.NOT_FOUND, true);
      return next(err)
  }
}

async function setCharacter (req, res, next) {
    try {
        const user = req.params._id
        const { character } = req.body
        const doc = {character, user}
        const UC = await _mongo.uniqSave(doc, doc, UserCharacter)
        const permission = _mongo.setUserPermission({ user, character })
        console.log('permission', permission)
        return res.json(UC)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function delCharater (req, res, next) {

}

export default {
    index,
    create,
    show,
    update,
    destroy,
    getCharacter,
    setCharacter,
    delCharater
}