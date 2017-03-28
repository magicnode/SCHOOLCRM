import httpStatus from 'http-status'

import Lists from '../../models/list.model'

import APIError from '../../helpers/apierror.helper'
import _mongo from '../../helpers/mongo.helper'

async function index(req, res, next) {
    try {
        let reqquery = req.query,
            skip = Number(reqquery.skip) || 0,
            limit = Number(reqquery.limit) || 50
        let query = {}
        const list = await _mongo.list({ limit, skip, Mon: Lists}).populate('goods')
        return res.json(list)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true)
        return next(err)
    }
}

async function create(req, res, next) {
    try {
        const { name, description } = req.body
        const doc = { name, description }
        const lists = await _mongo.uniqSave({ name }, doc, Lists)
        return res.json(lists)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function show(req, res, next) {
    try {
        let { _id } = req.params
        const list = await Lists.findOne({_id}).populate('goods')
        return res.json(list)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true)
        return next(err)
    }
}

async function update(req, res, next) {
    try {
        const { _id } = req.params
        let { goods } = req.body
        if (!Array.isArray(goods)) {
            let arr = []
            arr.push(goods)
            goods = arr
        }
        const lists = await Lists.update({_id}, {$addToSet: {goods: {$each: goods}}})
        return res.json(lists)
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
