import httpStatus from 'http-status'

import Character from '../../models/character.model'

import APIError from '../../helpers/apierror.helper'
import _mongo from '../../helpers/mongo.helper'


/**
 * @api {get} /characters Request characters info
 * @apiName GetCharacters
 * @apiGroup characters
 * @apiParam {Number} limit the number of return data length.
 *
 * @apiSuccessExample {json} Success-Response:
 *   HTTP/1.1 200 OK
 */
async function index(req, res, next) {
    try {
        let reqquery = req.query,
            skip = Number(reqquery.skip) || 0,
            limit = Number(reqquery.limit) || 50
        let query = {}
        const character = await Character.list({ query, skip, limit })
        if (character.length === 0) {
            let err = new APIError('not found', httpStatus.NOT_FOUND)
            return next(err)
        }
        return res.json(character)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err);
    }
}

async function create(req, res, next) {
    try {
        const { user_id } = req.user
        const { name } = req.body
        const doc = { name, user: user_id }
        const character = await _mongo.uniqSave(doc, doc, Character)
        return res.json(character)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err);
    }
}

function show(req, res, next) {

}

function update(req, res, next) {

}

function destroy(req, res, next) {

}

export default {
    index,
    create,
    show,
    update,
    destroy
}
