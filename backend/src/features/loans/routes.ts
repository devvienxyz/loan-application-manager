import { Router } from "express";
import {
  applyForLoan,
  getLoanDetails,
  updateLoan,
  deleteLoan,
  getAllUserLoans,
} from "@/features/loans/controller";
import { authenticate } from "@/features/auth/middleware";

const router = Router();

router.use(authenticate);

// Gets all loans for the authenticated user; If admin, get all loans
router.get("/", getAllUserLoans);
router.post("/apply", applyForLoan);
router.get("/:loanId", getLoanDetails);
router.patch("/:loanId", updateLoan);
router.delete("/:loanId", deleteLoan);

export default router;
