import express from 'express'
import Ctrl from './auth.controller'

const router = express.Router();

router.route('/')
      .get(Ctrl.index)
      .post(Ctrl.create);


export default {
	router,
	baseUrl: '/auth'
}
