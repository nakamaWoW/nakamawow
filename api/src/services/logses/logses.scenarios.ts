import type { Prisma, Logs } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.LogsCreateArgs>({
  logs: {
    one: { data: { raiderName: 'String', raiderReserves: 1522983 } },
    two: { data: { raiderName: 'String', raiderReserves: 2132398 } },
  },
})

export type StandardScenario = ScenarioData<Logs, 'logs'>
