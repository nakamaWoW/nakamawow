import React, { useState } from 'react'

import { Tab } from '@headlessui/react'
import type { FindRaidersQuery, FindRaidersQueryVariables } from 'types/graphql'

import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import RaiderTable from 'src/components/RaiderTable/RaiderTable'

export const QUERY: TypedDocumentNode<
  FindRaidersQuery,
  FindRaidersQueryVariables
> = gql`
  query FindRaidersQuery {
    raiders {
      id
      class
      spec
      name
      role
      reserves
      Raids {
        createdAt
        updatedAt
        raid
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRaidersQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  raiders,
}: CellSuccessProps<FindRaidersQuery, FindRaidersQueryVariables>) => {
  const [getReserves, setReserves] = useState([])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // Function to update reserves for a specific raider
  const updateReserves = (raiderName, reserves) => {
    // Find the index of the raider in the array
    const raiderIndex = raiders.findIndex(
      (raider) => raider.name === raiderName
    )

    // If the raider is found, update their reserves
    if (raiderIndex !== -1) {
      const updatedRaiders = [...raiders]
      updatedRaiders[raiderIndex].reserves = reserves
      setReserves(updatedRaiders)
    }
  }

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
    // show popup with raider names and => changes to reserves
  }

  const onExport = () => {
    // Print CSV from current raider data
  }

  return (
    <div className="min-h-screen flex items-center justify-center gap-10">
      <div className="w-96">
        <Form onSubmit={onSubmit} className="flex flex-col gap-2">
          <TextAreaField
            name="csv"
            placeholder="CSV String goes here"
            className="border-2 border-gray-200 p-2 h-96"
          />
          <div className="flex flex-row justify-between">
            <button
              className="border-2 border-red-200 bg-red-50 rounded-lg w-24 py-2"
              type="button"
              onClick={onExport}
            >
              Export
            </button>
            <Submit className="border-2 border-green-200 bg-green-50 rounded-lg w-24 py-2">
              Import
            </Submit>
          </div>
        </Form>
      </div>
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
              <RaiderTable raiders={raiders} />
            </Tab.Panel>
            <Tab.Panel>
              <div>raids</div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
