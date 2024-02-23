import React, { useState } from 'react'

import { Tab } from '@headlessui/react'
import CryptoJS from 'crypto-js'
import type {
  FindRaidersRaidQuery,
  FindRaidersRaidQueryVariables,
  UpdateRaiderMutation,
  UpdateRaiderMutationVariables,
  CreateLogsMutation,
  CreateLogsMutationVariables,
} from 'types/graphql'

import { Form, Submit, TextAreaField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

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

const UPDATE_RAIDER = gql`
  mutation UpdateRaiderMutation($id: Int!, $input: UpdateRaiderInput!) {
    updateRaider(id: $id, input: $input) {
      id
      name
      reserves
    }
  }
`

const CREATE_LOG = gql`
  mutation CreateLogsMutation($input: CreateLogsInput!) {
    createLogs(input: $input) {
      id
      raiderName
      raiderReserves
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
    class: raider.class,
    spec: raider.spec,
    role: raider.role,
    id: raider.id,
  }))

  const fixedString = 'WOW.Nakama'
  const pass = 'U2FsdGVkX19aKdGZakmmKYse4HeYmXYzhFrngBpNltg='

  const [isAllowed, setAllowed] = useState(false)
  const [isImportReady, setImportReady] = useState(false)
  const [getCSV, setCSV] = useState('')
  const [getReserves, setReserves] = useState(initialRaiders)

  const [createLog] = useMutation<
    CreateLogsMutation,
    CreateLogsMutationVariables
  >(CREATE_LOG)

  const [updateRaider] = useMutation<
    UpdateRaiderMutation,
    UpdateRaiderMutationVariables
  >(UPDATE_RAIDER, {
    onCompleted: (data) => {
      toast.success('Raider updated: ' + data.updateRaider.name)
      setCSV('')
      setImportReady(false)
      createLog({
        variables: {
          input: {
            raiderName: data.updateRaider.name,
            raiderReserves: data.updateRaider.reserves,
          },
        },
      })
    },
  })

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // Function to update reserves for a specific raider
  const updateReserves = (raiderName, reserves) => {
    // Find the index of the raider in the array
    const raiderIndex = getReserves.findIndex(
      (raider) => raider.name === raiderName
    )

    // If the raider is found, update their reserves
    if (raiderIndex !== -1) {
      const updatedRaiders = [...getReserves]
      updatedRaiders[raiderIndex].reserves = reserves
      setReserves(updatedRaiders)
    }
  }

  const onImport = () => {
    const rows = getCSV.split('\n').map((row) => row.split(','))
    const header = rows.shift()
    const players = {}
    rows.forEach((row) => {
      const playerName = row[0]
      players[playerName] = (players[playerName] || 0) + 1
    })
    Object.entries(players).forEach(([playerName, count]) => {
      updateReserves(playerName, count)
    })

    setImportReady(true)
  }

  const onSubmit = () => {
    console.log('getReserves', getReserves)
    console.log('=====================')
    console.log('raiders', raiders)

    raiders.forEach((raider) => {
      // Find the corresponding reserve in the getReserves array
      const reserve = getReserves.find(
        (reserve) => reserve.name === raider.name
      )

      const delta = reserve ? reserve.reserves - raider.reserves : 0

      if (delta !== 0) {
        updateRaider({
          variables: { id: raider.id, input: { reserves: reserve.reserves } },
        })
      }
    })
  }

  const onReset = () => {
    setReserves(initialRaiders)
    setCSV('')
    setImportReady(false)
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

  const validatePW = (event) => {
    try {
      const decryptedBytes = CryptoJS.AES.decrypt(pass, event.target.value)
      const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8)

      if (decryptedString === fixedString) {
        setAllowed(true)
      } else {
        setAllowed(false)
      }
    } catch (error) {
      console.error('Incorrect password')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center gap-10">
      <div className="h-fit w-96">
        {isAllowed ? (
          <Form onSubmit={onSubmit} className="flex flex-col gap-2">
            <TextAreaField
              name="csv"
              placeholder="CSV String goes here"
              className="h-96 border-2 border-gray-200 p-2"
              value={getCSV}
              onChange={handleTextareaChange}
            />
            <div className="flex flex-row justify-between">
              <button
                className="w-24 rounded-lg border-2 border-red-200 bg-red-50 py-2"
                type="button"
                onClick={onExport}
              >
                Export
              </button>
              <button
                className="w-24 rounded-lg border-2 border-green-200 bg-green-50 py-2"
                type="button"
                onClick={onImport}
              >
                Import
              </button>
            </div>
            <div className="flex flex-row justify-between">
              <button
                className="w-24 rounded-lg border-2 border-orange-200 bg-orange-50 py-2"
                type="reset"
                onClick={onReset}
              >
                Reset
              </button>
              {isImportReady ? (
                <Submit className="w-24 rounded-lg border-2 border-blue-200 bg-blue-50 py-2">
                  Save
                </Submit>
              ) : null}
            </div>
          </Form>
        ) : (
          <>
            <p>Officer Access:</p>
            <input
              type="password"
              className="h-10 w-full rounded-sm border-2 border-black outline-none ring-0"
              onChange={validatePW}
            />
          </>
        )}
      </div>
      <div className="w-96">
        <Tab.Group>
          <Tab.List className="mb-2 flex gap-10 bg-slate-100 p-5">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 outline-none ring-0',
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
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 outline-none ring-0',
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
              <RaiderTable raiders={raiders} reserves={getReserves} />
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
