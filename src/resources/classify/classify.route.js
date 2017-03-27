import express from 'express'
import Ctrl from './classify.controller'

const router = express.Router();

router.route('/')
	    .get(Ctrl.index)
	    .post(Ctrl.create)

export default {
	router,
	baseUrl: '/classifies'
}
