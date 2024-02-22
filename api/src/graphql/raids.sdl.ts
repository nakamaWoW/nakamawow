export const schema = gql`
  type Raid {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    raid: Raids!
    Raiders: [Raider]!
  }

  enum Raids {
    BFD
    Gnomeregan
  }

  type Query {
    raids: [Raid!]! @requireAuth
    raid(id: Int!): Raid @requireAuth
  }

  input CreateRaidInput {
    raid: Raids!
  }

  input UpdateRaidInput {
    raid: Raids
  }

  type Mutation {
    createRaid(input: CreateRaidInput!): Raid! @requireAuth
    updateRaid(id: Int!, input: UpdateRaidInput!): Raid! @requireAuth
    deleteRaid(id: Int!): Raid! @requireAuth
  }
`
