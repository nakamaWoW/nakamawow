import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const logses: QueryResolvers['logses'] = () => {
  return db.logs.findMany()
}

export const logs: QueryResolvers['logs'] = ({ id }) => {
  return db.logs.findUnique({
    where: { id },
  })
}

export const createLogs: MutationResolvers['createLogs'] = ({ input }) => {
  return db.logs.create({
    data: input,
  })
}

export const updateLogs: MutationResolvers['updateLogs'] = ({ id, input }) => {
  return db.logs.update({
    data: input,
    where: { id },
  })
}

export const deleteLogs: MutationResolvers['deleteLogs'] = ({ id }) => {
  return db.logs.delete({
    where: { id },
  })
}
