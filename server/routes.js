import express from 'express';

import userController from './controllers/userController';
import timestampController from './controllers/timestampController';

const router = express.Router();

router.route('/api/user')
  .post(userController.createUser);

router.route('/api/user/:userId')
  .get(userController.findUser);

router.route('/api/timestamp/clockin')
  .post(timestampController.clockin);

router.route('/api/timestamp/clockout')
  .post(timestampController.clockout);

export default router;
