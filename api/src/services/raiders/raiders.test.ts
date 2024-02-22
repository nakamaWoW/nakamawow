import type { Raider } from '@prisma/client'

import {
  raiders,
  raider,
  createRaider,
  updateRaider,
  deleteRaider,
} from './raiders'
import type { StandardScenario } from './raiders.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('raiders', () => {
  scenario('returns all raiders', async (scenario: StandardScenario) => {
    const result = await raiders()

    expect(result.length).toEqual(Object.keys(scenario.raider).length)
  })

  scenario('returns a single raider', async (scenario: StandardScenario) => {
    const result = await raider({ id: scenario.raider.one.id })

    expect(result).toEqual(scenario.raider.one)
  })

  scenario('creates a raider', async () => {
    const result = await createRaider({
      input: {
        name: 'String8934413',
        class: 'Warrior',
        spec: 'DPS',
        role: 'Officer',
        reserves: 6686730,
      },
    })

    expect(result.name).toEqual('String8934413')
    expect(result.class).toEqual('Warrior')
    expect(result.spec).toEqual('DPS')
    expect(result.role).toEqual('Officer')
    expect(result.reserves).toEqual(6686730)
  })

  scenario('updates a raider', async (scenario: StandardScenario) => {
    const original = (await raider({ id: scenario.raider.one.id })) as Raider
    const result = await updateRaider({
      id: original.id,
      input: { name: 'String29719782' },
    })

    expect(result.name).toEqual('String29719782')
  })

  scenario('deletes a raider', async (scenario: StandardScenario) => {
    const original = (await deleteRaider({
      id: scenario.raider.one.id,
    })) as Raider
    const result = await raider({ id: original.id })

    expect(result).toEqual(null)
  })
})
