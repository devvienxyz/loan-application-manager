import { LoanOption } from "../types/loans.js";

const MINIMUM_LOAN = 1000;
const MAXIMUM_LOAN = 100000;
const LOAN_PURPOSE_OPTIONS: LoanOption[] = [
  { value: "HOME_IMPROVEMENT", label: "Home Improvement" },
  { value: "PERSONAL", label: "Personal" },
  { value: "OTHERS", label: "Others" },
];
// const LOAN_PURPOSE_OPTIONS: Record<> = {

// }
//   { value: "", label: "Home Improvement" },
//   { value: "PERSONAL", label: "Personal" },
//   { value: "OTHERS", label: "Others" },
// ];

export {
  MINIMUM_LOAN,
  MAXIMUM_LOAN,
  LOAN_PURPOSE_OPTIONS,
}
