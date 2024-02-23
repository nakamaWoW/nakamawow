export const schema = gql`
  type Logs {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    raiderName: String!
    raiderReserves: Int!
  }

  type Query {
    logses: [Logs!]! @requireAuth
    logs(id: Int!): Logs @requireAuth
  }

  input CreateLogsInput {
    raiderName: String!
    raiderReserves: Int!
  }

  input UpdateLogsInput {
    raiderName: String
    raiderReserves: Int
  }

  type Mutation {
    createLogs(input: CreateLogsInput!): Logs! @requireAuth
    updateLogs(id: Int!, input: UpdateLogsInput!): Logs! @requireAuth
    deleteLogs(id: Int!): Logs! @requireAuth
  }
`
