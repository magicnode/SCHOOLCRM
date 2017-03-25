import httpStatus from 'http-status'

import Permission from '../../models/permission.model'

import APIError from '../../helpers/apierror.helper'
import _mongo from '../../helpers/mongo.helper'


/**
 * @api {get} /permission Request permission info
 * @apiName GetPermission
 * @apiGroup permission
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
        const permission = await Permission.list({ query, skip, limit })
        if (permission.length === 0) {
            let err = new APIError('not found', httpStatus.NOT_FOUND)
            return next(err)
        }
        return res.json(permission)
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
        const doc = { name }
        const permission = await _mongo.uniqSave(doc, doc, Permission)
        return res.json(permission)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}


export default {
    index,
    create
}
