import { Request, Response } from "express";
import { LoanService } from "./service";

export const getAllUserLoans = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const isAdmin = req.user?.role === "admin";
  const loans = await LoanService.getAllLoans(userId, isAdmin);
  res.json(loans);
};

export const applyForLoan = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { name, amount } = req.body;
  const loan = await LoanService.applyForLoan(userId, { name, amount });
  res.status(201).json(loan);
};

export const getLoanDetails = async (req: Request, res: Response) => {
  const loan = await LoanService.getLoanById(req.params.loanId);

  if (!loan) {
    res.status(404).json({ message: "Loan not found" });
    return;
  }

  res.json(loan);
};

export const updateLoan = async (req: Request, res: Response) => {
  const updated = await LoanService.updateLoan(req.params.loanId, req.body);
  res.json(updated);
};

export const deleteLoan = async (req: Request, res: Response) => {
  await LoanService.deleteLoan(req.params.loanId);
  res.status(204).send();
};
