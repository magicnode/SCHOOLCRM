import express from 'express'
import Ctrl from './goods.controller'

const router = express.Router();

router.route('/')
	    .get(Ctrl.index)
	    .post(Ctrl.create)

router.route('/:_id')
	    .patch(Ctrl.update)
	    .delete(Ctrl.destroy)

export default {
	router,
	baseUrl: '/goods'
}
