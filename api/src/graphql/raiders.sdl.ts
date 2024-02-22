export const schema = gql`
  type Raider {
    id: Int!
    name: String!
    class: Class!
    spec: Specialization!
    role: Role!
    reserves: Int!
    Raids: [Raid]!
  }

  enum Class {
    Warrior
    Paladin
    Priest
    Rogue
    Warlock
    Hunter
    Mage
    Druid
    Unknown
  }

  enum Specialization {
    DPS
    Tank
    Healer
    Unknown
  }

  enum Role {
    Officer
    Raider
    Trial
    Unknown
  }

  type Query {
    raiders: [Raider!]! @requireAuth
    raider(id: Int!): Raider @requireAuth
  }

  input CreateRaiderInput {
    name: String!
    class: Class!
    spec: Specialization!
    role: Role!
    reserves: Int!
  }

  input UpdateRaiderInput {
    name: String
    class: Class
    spec: Specialization
    role: Role
    reserves: Int
  }

  type Mutation {
    createRaider(input: CreateRaiderInput!): Raider! @requireAuth
    updateRaider(id: Int!, input: UpdateRaiderInput!): Raider! @requireAuth
    deleteRaider(id: Int!): Raider! @requireAuth
  }
`
