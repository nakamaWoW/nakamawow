import { Tab } from '@headlessui/react'

import { Metadata } from '@redwoodjs/web'

import RaiderCell from 'src/components/RaiderCell'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const HomePage = () => {
  return (
    <>
      <Metadata title="Reserves" description="Website for Nakama WoW guild" />

      <div className="min-h-screen flex items-center justify-center">
        <div className="w-96">Input</div>
        <div className="w-96">
          <Tab.Group>
            <Tab.List className="flex p-5 gap-10 bg-slate-100 mb-2">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    selected
                      ? 'bg-white text-black shadow'
                      : 'text-gray-500 hover:bg-white/[0.12]'
                  )
                }
              >
                Raiders
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    selected
                      ? 'bg-white text-black shadow'
                      : 'text-gray-500 hover:bg-white/[0.12]'
                  )
                }
              >
                Raids
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="h-96 w-full overflow-y-auto overflow-x-hidden">
                <RaiderCell />
              </Tab.Panel>
              <Tab.Panel>
                <div>raids</div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  )
}

export default HomePage
