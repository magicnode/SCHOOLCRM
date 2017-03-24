import User from '../../models/user.model'
import Character from '../../models/character.model'
import Permission from '../../models/permission.model'

function getUser () {

}

// getUser(req.user)
// getCharacter()
// getPermission()
// getReqPath()
// judgePermission()

function rbac (o) {
  return function rbacMiddleware (req, res, next) {
  	next()
  }
}

export default rbac
