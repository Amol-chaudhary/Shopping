const express = require('express');
const {
  transactionById,
  alltransaction,
  gettransaction,
  updatetransaction,
  deletetransaction,
  create,
} = require('../controllers/transaction');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/transaction', alltransaction);
router.post('/transaction/create', create);
router.post('/transaction/:transactionId', gettransaction);
router.put('/transaction/:transactionId', updatetransaction);
router.delete('/transaction/:transactionId', deletetransaction);

router.param('transactionId', transactionById);

module.exports = router;
