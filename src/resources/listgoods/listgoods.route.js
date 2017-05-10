import express from 'express'
import Ctrl from './listgoods.controller'

const router = express.Router()

router.route('/')
	    .get(Ctrl.index)
	    .post(Ctrl.create)

router.route('/:_id')
 	    .get(Ctrl.show)
	    .put(Ctrl.update)
	    .patch(Ctrl.update)

export default {
	router,
	baseUrl: '/listgoods'
}
