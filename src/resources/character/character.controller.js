import httpStatus from 'http-status'

import APIError from '../../helpers/apierror.helper'

async function index(req, res, next) {
    try {
        return res.send('oias8aisd')
    }catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err);
    }
}

function create(req, res, next) {

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
