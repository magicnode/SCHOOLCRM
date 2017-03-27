import express from 'express'
import Ctrl from './goods.controller'

const router = express.Router();

router.route('/')
	    .get(Ctrl.index)
	    .post(Ctrl.create)

export default {
	router,
	baseUrl: '/goods'
}
