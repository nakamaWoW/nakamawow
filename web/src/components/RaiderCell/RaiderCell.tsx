import React, { useState } from 'react'

import { Tab } from '@headlessui/react'
import type {
  FindRaidersRaidQuery,
  FindRaidersRaidQueryVariables,
} from 'types/graphql'

import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import RaiderTable from 'src/components/RaiderTable/RaiderTable'
import RaidTable from 'src/components/RaidTable/RaidTable'

export const QUERY: TypedDocumentNode<
  FindRaidersRaidQuery,
  FindRaidersRaidQueryVariables
> = gql`
  query FindRaidersRaidQuery {
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
    raids {
      createdAt
      updatedAt
      raid
      id
      Raiders {
        id
        name
        reserves
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRaidersRaidQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  raiders,
  raids,
}: CellSuccessProps<FindRaidersRaidQuery, FindRaidersRaidQueryVariables>) => {
  const initialRaiders = raiders.map((raider) => ({
    name: raider.name,
    reserves: raider.reserves,
  }))
  const [isImportReady, setImportReady] = useState(false)
  const [getCSV, setCSV] = useState('')
  const [getReserves, setReserves] = useState(initialRaiders)

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

  const onImport = () => {
    // upload to DB
    setCSV('')
    setImportReady(false)
  }

  const onSubmit = (data) => {
    console.log('Form submitted:', data)
    // display in table +1
    setImportReady(true)
  }

  const onReset = () => {
    setCSV('')
  }

  const onExport = () => {
    setCSV(
      'Player,Class,ExtraReserves,RollBonus,Item,Count\n' +
        raiders
          .flatMap((raider) =>
            Array.from(
              { length: raider.reserves },
              () => raider.name + ',' + raider.class.toUpperCase() + ',0,0,0,1'
            )
          )
          .join('\n')
    )
  }

  const handleTextareaChange = (event) => {
    setCSV(event.target.value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center gap-10">
      <div className="w-96">
        <Form onSubmit={onSubmit} className="flex flex-col gap-2">
          <TextAreaField
            name="csv"
            placeholder="CSV String goes here"
            className="border-2 border-gray-200 p-2 h-96"
            value={getCSV}
            onChange={handleTextareaChange}
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
          <button
            className="border-2 border-orange-200 bg-orange-50 rounded-lg w-24 py-2"
            type="button"
            onClick={onReset}
          >
            Reset
          </button>
        </Form>
      </div>
      <div className="w-96">
        <Tab.Group>
          <Tab.List className="flex p-5 gap-10 bg-slate-100 mb-2">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full ring-0 outline-none rounded-lg py-2.5 text-sm font-medium leading-5',
                  selected
                    ? 'bg-white text-black shadow'
                    : 'text-gray-500 hover:bg-white/[0.12]'
                )
              }
            >
              Raiders ({raiders.length})
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full ring-0 outline-none rounded-lg py-2.5 text-sm font-medium leading-5',
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
            <Tab.Panel className="h-96 w-full">
              <RaiderTable raiders={raiders} />
              {isImportReady ? (
                <button
                  className="border-2 border-blue-200 bg-blue-50 rounded-lg mt-2 w-full py-2"
                  type="button"
                  onClick={onImport}
                >
                  Save
                </button>
              ) : null}
            </Tab.Panel>
            <Tab.Panel>
              <RaidTable raids={raids} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
