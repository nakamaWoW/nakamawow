import type {
  QueryResolvers,
  MutationResolvers,
  RaiderRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const raiders: QueryResolvers['raiders'] = () => {
  return db.raider.findMany({
    orderBy: [
      {
        reserves: 'desc',
      },
      {
        role: 'asc',
      },
    ],
  })
}

export const raider: QueryResolvers['raider'] = ({ id }) => {
  return db.raider.findUnique({
    where: { id },
  })
}

export const createRaider: MutationResolvers['createRaider'] = ({ input }) => {
  return db.raider.create({
    data: input,
  })
}

export const updateRaider: MutationResolvers['updateRaider'] = ({
  id,
  input,
}) => {
  return db.raider.update({
    data: input,
    where: { id },
  })
}

export const deleteRaider: MutationResolvers['deleteRaider'] = ({ id }) => {
  return db.raider.delete({
    where: { id },
  })
}

export const Raider: RaiderRelationResolvers = {
  Raids: (_obj, { root }) => {
    return db.raider.findUnique({ where: { id: root?.id } }).Raids()
  },
}
