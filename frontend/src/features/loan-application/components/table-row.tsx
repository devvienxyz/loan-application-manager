import { LoanApplication } from "@loan-app-mgr/shared/types/loans"

type Props = {
  rowData: LoanApplication
}

export default function TableRow({ rowData }: Props) {
  const { id, name, status, amount, createdAt } = rowData;

  return (
    <tr className="hover:bg-slate-50 border-b border-slate-200">
      <td className="p-4 py-5">
        <p className="block font-semibold text-sm text-slate-800">{id}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{name}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">${amount}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{status}</p>
      </td>
      <td className="p-4 py-5">
        <p className="text-sm text-slate-500">{createdAt}</p>
      </td>
    </tr>
  )
}