const express = require('express');
const {
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  create,
} = require('../controllers/users');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/users', allUsers);
router.post('/users/create', create);
router.get('/users/:userId', getUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

router.param('userId', userById);

module.exports = router;
