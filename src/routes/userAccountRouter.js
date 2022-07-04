import express from 'express';
import getBalance from '../controllers/getBalance.js';
import getUserEntries from '../controllers/getUserEntries.js';
import transaction from '../controllers/transation.js';
import validateEntry from '../middlewares/validateEntry.js';
import validateSession from '../middlewares/validateSession.js';

const router = express.Router();

router.get("/transactions", validateSession, getUserEntries);
router.get("/balance", validateSession, getBalance);
router.post("/transactions", validateEntry, validateSession, transaction);
//router.put("/transaction", );
//router.delete("/transaction", );

export default router;