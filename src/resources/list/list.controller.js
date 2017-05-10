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
        const { name, description, term } = req.body
        const {user_id} = req.user
        console.log('user', req.user)
        const user = await User.findOne({_id: user_id})
        console.log('user', user)
        const doc = { name, description, lab: user.lab, term }
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
        let list = await Lists.findOne({_id}).populate('listgoods')
        let listgoods = list.listgoods
        let arr = []
        for (let i = 0, len = listgoods.length; i< len; i++) {
            let ob = {}
            let good_id = listgoods[i].goods
            let goods = await Goods.findOne({_id: good_id})
            ob.goods = goods
            ob.count = listgoods[i].count
            arr.push(ob)
        }
        console.log('asdas', arr)
        list.listgoods = await arr
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
        let { goods, count } = req.body
        let lists = {}
        if (goods) {
            const listgoods = new ListGoods({ goods, count, list: _id })
            const saveres = await listgoods.save()
            if (!saveres._id) {
              return res.status(500).send('fail')
            }
            lists = await Lists.update({_id}, {$addToSet: {listgoods: saveres._id}})
        } else {
          lists = await Lists.update({_id}, req.body)
        }
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
