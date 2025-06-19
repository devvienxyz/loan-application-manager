import { Router } from "express";
import {
  applyForLoan,
  getLoanDetails,
  updateLoan,
  deleteLoan,
  getAllUserLoans,
} from "@/features/loans/controller.ts";
import { authenticate, authorizeAdmin } from "@/features/auth/middleware.ts";

const router = Router();

router.use(authenticate);

// Gets all loans for the authenticated user; If admin, get all loans
router.get("/", getAllUserLoans);
router.post("/apply", applyForLoan);
router.get("/:loanId", getLoanDetails);

// Admin only
router.patch("/:loanId", authorizeAdmin, updateLoan);
router.delete("/:loanId", authorizeAdmin, deleteLoan);

export default router;
