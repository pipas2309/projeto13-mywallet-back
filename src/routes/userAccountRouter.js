import express from 'express';
import transaction from '../controllers/transation.js';
import validateEntry from '../middlewares/validateEntry.js';

const router = express.Router();

router.get("/transactions-list", );
router.get("/balance", );
router.post("/transaction", validateEntry, transaction);
//router.put("/transaction", );
//router.delete("/transaction", );

export default router;