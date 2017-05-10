import httpStatus from 'http-status'
import Lab from '../../models/lab.model'

import APIError from '../../helpers/apierror.helper'
import _mongo from '../../helpers/mongo.helper'

async function index(req, res, next) {
    try {
        const list = await _mongo.list({Mon: Lab})
        return res.json(list)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true)
        return next(err)
    }
}

async function create(req, res, next) {
    try {
        const { name, depart, description } = req.body
        const doc = { name, depart, description}
        const lab = await _mongo.uniqSave({ name }, doc, Lab)
        return res.json(lab)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }

}

function show(req, res, next) {

}

async function update(req, res, next) {
    try {
        const { _id } = req.params
        const body = req.body
        const lab = await Lab.update({_id}, body)
        return res.json(lab)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function destroy(req, res, next) {
    try {
        const { _id } = req.params
        const lab = await Lab.remove({_id})
        return res.json(lab)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

export default {
    index,
    create,
    show,
    update,
    destroy
}
