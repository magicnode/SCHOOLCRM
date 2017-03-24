import express from 'express';
import authCtrl from './auth.controller';

const router = express.Router();

router.route('/')
      .get(authCtrl.create)
      .post(authCtrl.create)

router.route('/:id')
      .get(authCtrl.create)
      .post(authCtrl.create)

router.route('/check')
    .post(authCtrl.check)

export default {
    router,
    baseUrl: '/auth'
}