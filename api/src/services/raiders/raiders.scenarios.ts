import type { Prisma, Raider } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RaiderCreateArgs>({
  raider: {
    one: {
      data: {
        name: 'String4579950',
        class: 'Warrior',
        spec: 'DPS',
        role: 'Officer',
        reserves: 5087866,
      },
    },
    two: {
      data: {
        name: 'String824984',
        class: 'Warrior',
        spec: 'DPS',
        role: 'Officer',
        reserves: 69296,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Raider, 'raider'>
