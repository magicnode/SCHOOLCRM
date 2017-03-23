import express from 'express'
import Ctrl from './character.controller'

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create)
      .put(Ctrl.create)
      .delete(Ctrl.create)

router.route('/:_id/user')
		  .get(Ctrl.index)
		  .post(Ctrl.index)
		  .put(Ctrl.index)
		  .delete(Ctrl.index)

export default {
	router,
	baseUrl: '/characters'
}
