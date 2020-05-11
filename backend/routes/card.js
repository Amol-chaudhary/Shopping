const express = require('express');
const {
  cardById,
  allcard,
  getcard,
  deletecard,
  create,
} = require('../controllers/card');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/card', allcard);
router.post('/card/create', create);
router.get('/card/:cardId', getcard);
router.delete('/card/:cardId', deletecard);

router.param('cardId', cardById);

module.exports = router;
