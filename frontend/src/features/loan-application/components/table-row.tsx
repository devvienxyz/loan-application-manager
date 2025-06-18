import CopyButton from "@/app/components/display/copy-button";
import monDateYearFormatter from "@/app/utils/date-formatters";
import figureFormatter from "@/app/utils/figure-formatters";
import { useAuthStore } from "@/features/auth/store";
import { LOAN_PURPOSE_LABELS, LOAN_STATUS_LABELS } from "@loan-app-mgr/shared/constants/loans";
import { LoanApplication, LoanPurposeKey, LoanStatusKey } from "@loan-app-mgr/shared/types/loans"

type Props = {
  rowData: LoanApplication;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TableRow({ rowData, onSelect, onEdit, onDelete }: Props) {
  const { id, purpose, status, amount, createdAt } = rowData;
  const { user } = useAuthStore();

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200" onClick={() => onSelect(id)}>
      <td className="p-4 py-5 flex items-center gap-2">
        <p className="w-[80px] truncate block font-semibold text-sm text-slate-800">{id}</p>
        <CopyButton text={id} />
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{LOAN_PURPOSE_LABELS[purpose as LoanPurposeKey]}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">$ {figureFormatter(amount)}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{LOAN_STATUS_LABELS[status as LoanStatusKey]}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{monDateYearFormatter(createdAt)}</p>
      </td>
      {user?.role && user.role.toLowerCase() === "admin" && (
        <td className="p-4 py-5 flex gap-6">
          <button type="button" className="text-sm font-bold" onClick={() => onEdit(id)}>Edit</button>
          <button type="button" className="text-sm font-bold" onClick={() => onDelete(id)}>Delete</button>
        </td>
      )}
    </tr>
  )
}
