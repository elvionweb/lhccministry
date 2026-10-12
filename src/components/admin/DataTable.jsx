const EmptyState = () => (
  <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M4 7h16M4 12h16M4 17h10" />
      </svg>
    </span>
    <p className="font-medium italic text-gray-500">No records found</p>
  </div>
);

const DataTable = ({ columns = [], data = [], actions }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md">
      {/* --- DESKTOP TABLE VIEW (Visible on tablet/laptop) --- */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="whitespace-nowrap px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-600"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-5 py-3.5 text-right text-xs font-bold uppercase tracking-wider text-gray-600">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {safeData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)}>
                  <EmptyState />
                </td>
              </tr>
            ) : (
              safeData.map((row, index) => (
                <tr
                  key={index}
                  className="transition-colors even:bg-gray-50/60 hover:bg-blue-50/60"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="max-w-xs px-5 py-3.5 align-middle text-gray-700">
                      {/* Using render function if provided in column definition, otherwise raw value */}
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="whitespace-nowrap px-5 py-3.5 text-right">
                      <div className="inline-flex items-center justify-end gap-2">
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => action.onClick(row)}
                            className={`rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-all hover:bg-gray-200 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 active:scale-95 ${action.color || 'text-blue-600'}`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARD VIEW (Visible on small screens) --- */}
      <div className="space-y-3 bg-gray-50 p-3 md:hidden">
        {safeData.length === 0 ? (
          <EmptyState />
        ) : (
          safeData.map((row, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="divide-y divide-gray-100">
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className="flex items-start justify-between gap-4 px-4 py-3"
                  >
                    <span className="shrink-0 pt-0.5 text-[11px] font-bold uppercase tracking-wider text-cyan-700 font-heading">
                      {col.label}
                    </span>
                    <div className="min-w-0 break-words text-right font-body text-sm text-gray-800">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Actions Area */}
              {actions && (
                <div className="flex flex-wrap gap-2 border-t border-gray-100 bg-gray-50/70 p-3">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => action.onClick(row)}
                      className={`min-w-[5.5rem] flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-bold uppercase tracking-wide shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 active:scale-95 ${action.color || 'text-blue-600'}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataTable;
