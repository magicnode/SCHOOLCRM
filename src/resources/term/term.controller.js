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
        const { name, description } = req.body
        const doc = { name, description}
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

async function destroy(req, res, next) {
    try {
        const { _id } = req.body
        const term = await Term.remove({_id})
        console.log(`id is ${_id}, term is ${term}`)
        return res.json(term)
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
