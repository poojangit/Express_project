import express from 'express';
const router = express.Router();

import userRoute from './user.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Hello Welcome to awesome-project');
  });
  router.use('/users', userRoute);
  return router;
};

export default routes;
