/**
 * Module description: mongo helper
 */
import User from '../models/user.model'
import UserCharacter from '../models/user_character.model'
import UserPermission from '../models/user_permission.model'
import Character from '../models/character.model'
import CharacterPermissioin from '../models/character_permission.model'

function uniqSave(query, data, MonSchema) {
    return new Promise((resolve, reject) => {
        MonSchema.findOne(query)
            .then(result => {
                if (!result) {
                    result = new MonSchema(data);
                    return result.save();
                }
                return result;
            })
            .then(rs => {
                return resolve(rs);
            })
            .catch(err => {
                console.error(err);
                return reject(err)
            })
    })
}

async function setUserPermission ({user, character}) {
    try {
        const permissionDoc = await CharacterPermissioin.find({character})
        console.log('permissionDoc', permissionDoc)
        const permissionIds  = await permissionDoc.map(function(item){
            let permissionid = item.permission
            return permissionid
        })
        console.log('permissionid', permissionIds)
        let UP = await UserPermission.findOne({user})
        console.log('user', user)
        if (!UP) {
            const userDoc = new UserPermission({user})
            const newuser = await userDoc.save()
            console.log('new', newuser)
        }
        console.log('UP', UP)
        UP = await UserPermission.update({user}, {$addToSet: {permission: {$each: permissionIds}}})
        return UP
    } catch (err) {
        console.error(err)
    }
}


async function getUserPermission ({user}) {
    try {
        const userCharacter = await UserCharacter.find({user})
        const characters = await userCharacter.map(function(item){
            let characterId = item.character
            return characterId
        })
        const permissionDoc = await CharacterPermissioin.find({character: {$in: characters}}).populate('permission')
        const permission  = await permissionDoc.map(function(item){
            let permissionid = item.permission
            return permissionid
        })
        // console.log('permission', permission)
        return permission
    } catch (err) {
        console.error(err)
    }
}

export default {
    uniqSave,
    setUserPermission,
    getUserPermission
}