import { Link, routes } from '@redwoodjs/router'

const RaidTable = ({ raids }) => {
  return (
    <div className="flow-root">
      <div className="inline-block max-h-96 min-w-full overflow-y-auto align-middle">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="sticky top-0 bg-slate-600 text-white">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold "
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold "
              >
                Raid Day
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold "
              >
                Raiders
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-gray-500">
            {raids.map((raid) => (
              <tr key={raid.id}>
                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 flex-shrink-0">
                      <img
                        className="h-8 w-10 object-contain"
                        src={'/Gnomeregan.png'}
                        alt="Raid Icon"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-purple-300">
                        <Link to={routes.raid({ id: raid.id })}>
                          {raid.raid}
                        </Link>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div className="text-white">
                    {new Date(raid.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                  <div className="text-white">{raid.Raiders.length}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RaidTable
