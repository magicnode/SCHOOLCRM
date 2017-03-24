import express from 'express'
import Ctrl from './character.controller'

const router = express.Router();

router.route('/')
	    .get(Ctrl.index)
	    .post(Ctrl.create)

router.route('/:_id/permission')
		  .get(Ctrl.getPermission)
		  .post(Ctrl.setPermission)

export default {
	router,
	baseUrl: '/characters'
}
