import httpStatus from 'http-status'

import Lists from '../../models/list.model'
import Goods from '../../models/goods.model'
import ListGoods from '../../models/list_goods.model'
import User from '../../models/user.model'

import APIError from '../../helpers/apierror.helper'
import _mongo from '../../helpers/mongo.helper'

async function index(req, res, next) {
    try {
        let reqquery = req.query,
            skip = Number(reqquery.skip) || 0,
            limit = Number(reqquery.limit) || 50
        let query = {}
        const list = await _mongo.list({ limit, skip, Mon: Lists}).populate('listgoods')
        return res.json(list)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true)
        return next(err)
    }
}

async function create(req, res, next) {
    try {
        const { name, description, term } = req.body
        return res.json(description)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function show(req, res, next) {
    try {
        return res.json({})
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true)
        return next(err)
    }
}

async function update(req, res, next) {
    try {
        const { _id } = req.params
        let body = req.body
        let listgoods = await ListGoods.update({_id}, req.body)
        return res.json(listgoods)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
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
