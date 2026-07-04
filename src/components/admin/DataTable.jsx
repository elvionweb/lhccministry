const DataTable = ({ columns = [], data = [], actions }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* --- DESKTOP TABLE VIEW (Visible on tablet/laptop) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-semibold text-gray-700">
                  {col.label}
                </th>
              ))}
              {actions && <th className="px-4 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {safeData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10 text-gray-500 italic">
                  No records found
                </td>
              </tr>
            ) : (
              safeData.map((row, index) => (
                <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700">
                      {/* Using render function if provided in column definition, otherwise raw value */}
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right space-x-3">
                      {actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => action.onClick(row)}
                          className={`font-medium ${action.color || 'text-blue-600'}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MOBILE CARD VIEW (Visible on small screens) --- */}
      <div className="md:hidden divide-y divide-gray-100">
        {safeData.length === 0 ? (
          <div className="p-8 text-center text-gray-500 italic">No records found</div>
        ) : (
          safeData.map((row, index) => (
            <div key={index} className="p-4 space-y-3.5">
              {columns.map((col) => (
                <div key={col.key} className="flex flex-col">
                  <span className="text-[14px] uppercase font-bold text-cyan-600 font-heading tracking-wider">
                    {col.label}
                  </span>
                  <div className="text-gray-800 mt-0.5 break-words font-body text-xl">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </div>
                </div>
              ))}
              
              {/* Mobile Actions Area */}
              {actions && (
                <div className="pt-2 flex flex-wrap gap-3 border-t border-gray-50 mt-2">
                  {actions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => action.onClick(row)}
                      className={`text-xs font-bold uppercase py-1.5 px-3 rounded bg-gray-50 ${action.color || 'text-blue-600'}`}
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