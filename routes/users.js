const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const regEx = require('../constants/constants');
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

const userRouter = Router();
userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserInfo);
userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(regEx),
  }),
}), updateUserAvatar);

module.exports = userRouter;
