import pathRegexp from 'path-to-regexp'

import User from '../../models/user.model'
import Character from '../../models/character.model'
import Permission from '../../models/permission.model'

import _mongo from '../../helpers/mongo.helper'

function rbac (o) {
  return async function rbacMiddleware (req, res, next) {
  	if (!req.user) {
  		return next()
  	}
  	const {user_id} = req.user
  	console.log('user', user_id)
  	const permission = await _mongo.getUserPermission({user: user_id})
  	console.log('permission', permission)
  	const url = req.url
  	const resource = url.replace('/', '')
  	const method = req.originalMethod.toLowerCase()
  	console.log('url', url)
  	console.log('resource', resource)
  	console.log('method', method)
  	let len = permission.length - 1
  	let key = false
  	while (len >= 0 && !key ) {
	  		let perm = permission[len]
	  		let perm_resource = perm.resource
	  		let perm_url = perm.url
	  		let perm_method = perm.method
	  		console.log('permi', perm)
	  		console.log('perm_resource', perm_resource)
	  		console.log('perm_url', perm_url)
	  		console.log('perm_method', perm_method)
	  		if (perm_resource === resource && perm_method === method) {
	  			key = true
	  		}
	  		len--
  	}
  	console.log('key', key)

  	if (!key) {
  		return res.send('no auth to this resource').status(401)
  	}


  	return next()
  }
}

export default rbac
