import type { Raid } from '@prisma/client'

import { raids, raid, createRaid, updateRaid, deleteRaid } from './raids'
import type { StandardScenario } from './raids.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('raids', () => {
  scenario('returns all raids', async (scenario: StandardScenario) => {
    const result = await raids()

    expect(result.length).toEqual(Object.keys(scenario.raid).length)
  })

  scenario('returns a single raid', async (scenario: StandardScenario) => {
    const result = await raid({ id: scenario.raid.one.id })

    expect(result).toEqual(scenario.raid.one)
  })

  scenario('creates a raid', async () => {
    const result = await createRaid({
      input: { raid: 'BFD' },
    })

    expect(result.raid).toEqual('BFD')
  })

  scenario('updates a raid', async (scenario: StandardScenario) => {
    const original = (await raid({ id: scenario.raid.one.id })) as Raid
    const result = await updateRaid({
      id: original.id,
      input: { raid: 'Gnomeregan' },
    })

    expect(result.raid).toEqual('Gnomeregan')
  })

  scenario('deletes a raid', async (scenario: StandardScenario) => {
    const original = (await deleteRaid({ id: scenario.raid.one.id })) as Raid
    const result = await raid({ id: original.id })

    expect(result).toEqual(null)
  })
})
