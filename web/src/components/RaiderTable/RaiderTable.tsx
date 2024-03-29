const RaiderTable = ({ raiders, reserves }) => {
  return (
    <div className="flow-root">
      <div className="inline-block max-h-96 min-w-full overflow-y-auto align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="sticky top-0 bg-slate-500 text-white">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold "
              >
                Reserves
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold "
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-600">
            {raiders.map((raider) => {
              // Find the corresponding raider in the reserves array
              const reserve = reserves.find(
                (reserve) => reserve.name === raider.name
              )

              // Calculate the difference in reserves
              const delta = reserve ? reserve.reserves - raider.reserves : 0

              return (
                <tr key={raider.id}>
                  <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 flex-shrink-0">
                        <img
                          className="h-8 w-8"
                          src={'/' + raider.class.toString() + '.png'}
                          alt={raider.class}
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          <a
                            href={`https://atlasforge.gg/wow-classic/armory/us/wild-growth/${raider.name}`}
                            className="text-purple-500"
                          >
                            {raider.name}
                          </a>
                        </div>
                        <div className="mt-1 text-white">{raider.spec}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <div className="text-white">
                      {reserve ? (
                        <>
                          {reserve.reserves}
                          <br />
                          <span
                            className={
                              delta > 0
                                ? 'text-green-500'
                                : delta < 0
                                ? 'text-red-500'
                                : ''
                            }
                          >
                            {delta > 0
                              ? '+' + delta
                              : delta === 0
                              ? null
                              : delta}
                          </span>
                        </>
                      ) : (
                        raider.reserves
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        raider.role === 'Officer'
                          ? 'bg-green-50 text-green-700 ring-green-600/20'
                          : raider.role === 'Raider'
                          ? 'bg-red-50 text-red-700 ring-red-600/20'
                          : raider.role === 'Trial'
                          ? 'bg-purple-50 text-purple-700 ring-purple-600/20'
                          : 'bg-gray-50 text-gray-700 ring-gray-600/20'
                      }`}
                    >
                      {raider.role}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RaiderTable
