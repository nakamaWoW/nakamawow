import type { Prisma, Raid } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RaidCreateArgs>({
  raid: { one: { data: { raid: 'BFD' } }, two: { data: { raid: 'BFD' } } },
})

export type StandardScenario = ScenarioData<Raid, 'raid'>
