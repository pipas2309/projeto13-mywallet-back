import express from 'express';
import transaction from '../controllers/transation.js';
import validateEntry from '../middlewares/validateEntry.js';
import validateSession from '../middlewares/validateSession.js';

const router = express.Router();

router.get("/transactions-list", );
router.get("/balance", );
router.post("/transaction", validateEntry, validateSession, transaction);
//router.put("/transaction", );
//router.delete("/transaction", );

export default router;