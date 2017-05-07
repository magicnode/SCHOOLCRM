import express from 'express'
import Ctrl from './term.controller'

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);

export default {
	router,
	baseUrl: '/terms'
}
