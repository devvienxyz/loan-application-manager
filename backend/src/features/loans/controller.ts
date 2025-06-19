import { Request, Response } from "express";
import { LoanService } from "./service.ts";

export const getAllUserLoans = async (req: Request, res: Response) => {
  const userId = req.user?.id || "";
  const isAdmin = req.user?.role === "admin";

  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const search = (req.query.search as string) || "";

  const result = await LoanService.getAllLoans({ userId, isAdmin, page, pageSize, search });

  res.json(result); // { loans, total }
};

export const applyForLoan = async (req: Request, res: Response) => {
  const userId = req.user?.id || "";
  const { purpose, amount } = req.body;
  const loan = await LoanService.applyForLoan(userId, { purpose, amount });
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
