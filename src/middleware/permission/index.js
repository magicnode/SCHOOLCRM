import User from '../../models/user.model'
import Character from '../../models/character.model'
import Permission from '../../models/permission.model'
import _mongo from '../../helpers/mail.helper'

function getResource (regexp) {
  const resource = regexp.toString().match(/\/\w+/g)[0]
  return resource
}

async function getResourceDetail (stack, rootRoute) {
  const url = rootRoute + stack.route.path
  const resource = rootRoute.replace('/', '')
  const stacks = stack.route.stack
  console.log(`path is ${url}, methods is ${stacks}`)
  for (let i = 0, len = stacks.length; i < len; i++) {
    let method = stacks[i].method
    let name = method + ' ' + url
    let query = {
      method,
      resource,
      url
    }
    let doc = {
      name,
      resource,
      url,
      method
    }
    const permiss =  _mongo.uniqSave(query, doc, Permission)
  }
  return
}

function addPermission (o) {
  const { routes } = o
  const routeStack = routes.stack
  for (let i = 1, len = routeStack.length; i < len; i++) {
    let rootRoute = getResource(routeStack[i].regexp)
    let routeStackDetail = routeStack[i].handle.stack
    for (let j= 0, len = routeStackDetail.length; j < len; j++) {
      getResourceDetail(routeStackDetail[j], rootRoute)
    }
  }
  return
}

function permission (o) {
  return function permissionCheck (req, res, next) {
    if (req.url !== '/permission/check') {
      next()
    } else {
      addPermission(o)
      return res.send('permission check start')
    }
  }
}

export default permission
