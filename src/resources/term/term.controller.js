import httpStatus from 'http-status'
import Term from '../../models/term.model'

import APIError from '../../helpers/apierror.helper'
import _mongo from '../../helpers/mongo.helper'

async function index(req, res, next) {
    try {
        const list = await _mongo.list({Mon: Term})
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
        const term = await _mongo.uniqSave({ name }, doc, Term)
        return res.json(term)
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
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
