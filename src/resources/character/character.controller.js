import httpStatus from 'http-status'

import Character from '../../models/character.model'
import CharacterPermission from '../../models/character_permission.model'
import Permission from '../../models/permission.model'

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
            limit = Number(reqquery.limit) || 50,
            permissions = Number(reqquery.permissions)
        let query = {}
        let characters = await Character.list({ query, skip, limit })
        const len = characters.length
        if (len === 0) {
            let err = new APIError('not found', httpStatus.NOT_FOUND)
            return next(err)
        }
        if (permissions === 1) {
            let arr = []
            for (let i = 0; i < len; i++) {
                let CP = await CharacterPermission.find({character: characters[i]._id}, { permission: 1})
                                                  .populate('permission')
                let CPitem = await CP.map(function (item) {
                    return item.permission
                })
                let ob = {}
                ob._id = characters[i]._id
                ob.name = characters[i].name
                ob.permission = CPitem
                await arr.push(ob)
            }
            return res.json(arr)
        } else {
            return res.json(characters)
        }
        
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
        return next(err)
    }
}

function show(req, res, next) {

}

function update(req, res, next) {

}

function destroy(req, res, next) {

}

async function getPermission (req, res, next) {
    try {
        const character_id = req.params._id
        const CP = await CharacterPermission.find({character: character_id},
                {id:0, CreateAt:0}).populate('permission').populate('character')
        const character = CP[0].character
        const permissions = await CP.map(function(item){
            let perm = item.permission
            return perm
        })
        let rs = {}
        rs.character = character
        rs.permissions = permissions
        return res.json(rs)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function setPermission (req, res, next) {
    try {
        const character = req.params._id
        const { permission } = req.body
        const doc = {character, permission}
        const Cpssion = await _mongo.uniqSave(doc, doc, CharacterPermission)
        return res.json(Cpssion)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}

async function delPermission (req, res, next) {
    try {
        const character = req.params._id
        const { permission } = req.body
        console.log(`character is ${character}, permission is ${permission}`)
        const Cpssion = await CharacterPermission.remove({character, permission})
        return res.send(Cpssion)
    } catch (err) {
        console.error(err)
        err = new APIError(err.message, httpStatus.NOT_FOUND, true);
        return next(err)
    }
}
//获取未授权的权限
async function getNoAuthPermission (req, res, next) {
    try {
        const character_id = req.params._id
        const CP = await CharacterPermission.find({character: character_id})
        const permissions = await CP.map(function(item){
            let perm = item.permission
            return perm
        })
        const permissionArr = await Permission.find({_id: {$nin: permissions}})
        return res.json(permissionArr)
    } catch (err) {
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
    destroy,
    getPermission,
    setPermission,
    delPermission,
    getNoAuthPermission
}
