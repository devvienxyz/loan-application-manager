type Props = {
  page: number;
  pageSize: number;
  total: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export default function TablePagination({ page, pageSize, total, setPage, totalPages }: Props) {
  return (
    <div className="flex justify-between px-4 py-3">
      <div className="text-sm text-slate-500" aria-label="pagination-range">
        Showing <b>{(page - 1) * pageSize + 1}</b> to <b>{Math.min(page * pageSize, total)}</b> of {total}
      </div>
      <div className="flex gap-1">
        <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            type="button"
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}

        <button type="button" disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  )
}