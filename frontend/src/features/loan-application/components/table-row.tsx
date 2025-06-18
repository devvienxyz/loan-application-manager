import CopyButton from "@/app/components/display/copy-button";
import monDateYearFormatter from "@/app/utils/date-formatters";
import figureFormatter from "@/app/utils/figure-formatters";
import { LoanApplication, LoanPurposeKey, LoanPurposes, LoanStatuses, LoanStatusKey } from "@loan-app-mgr/shared/types/loans"

type Props = {
  rowData: LoanApplication
}

export default function TableRow({ rowData }: Props) {
  const { id, purpose, status, amount, createdAt } = rowData;

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
      <td className="p-4 py-5 flex items-center gap-2">
        <p className="w-1/4 block truncate block font-semibold text-sm text-slate-800">{id}</p>
        <CopyButton text={id} />
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{LoanPurposes[purpose as LoanPurposeKey]}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">$ {figureFormatter(amount)}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{LoanStatuses[status as LoanStatusKey]}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{monDateYearFormatter(createdAt)}</p>
      </td>
    </tr>
  )
}