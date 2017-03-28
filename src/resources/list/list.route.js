import express from 'express'
import Ctrl from './list.controller'

const router = express.Router();

router.route('/')
	    .get(Ctrl.index)
	    .post(Ctrl.create)

router.route('/:_id')
 	    .get(Ctrl.show)
	    .put(Ctrl.update)

export default {
	router,
	baseUrl: '/lists'
}
