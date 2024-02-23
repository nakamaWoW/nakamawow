import type { Logs } from '@prisma/client'

import { logses, logs, createLogs, updateLogs, deleteLogs } from './logses'
import type { StandardScenario } from './logses.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('logses', () => {
  scenario('returns all logses', async (scenario: StandardScenario) => {
    const result = await logses()

    expect(result.length).toEqual(Object.keys(scenario.logs).length)
  })

  scenario('returns a single logs', async (scenario: StandardScenario) => {
    const result = await logs({ id: scenario.logs.one.id })

    expect(result).toEqual(scenario.logs.one)
  })

  scenario('creates a logs', async () => {
    const result = await createLogs({
      input: { raiderName: 'String', raiderReserves: 1124955 },
    })

    expect(result.raiderName).toEqual('String')
    expect(result.raiderReserves).toEqual(1124955)
  })

  scenario('updates a logs', async (scenario: StandardScenario) => {
    const original = (await logs({ id: scenario.logs.one.id })) as Logs
    const result = await updateLogs({
      id: original.id,
      input: { raiderName: 'String2' },
    })

    expect(result.raiderName).toEqual('String2')
  })

  scenario('deletes a logs', async (scenario: StandardScenario) => {
    const original = (await deleteLogs({ id: scenario.logs.one.id })) as Logs
    const result = await logs({ id: original.id })

    expect(result).toEqual(null)
  })
})
