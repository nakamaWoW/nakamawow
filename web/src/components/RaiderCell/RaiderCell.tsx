import type { FindRaidersQuery, FindRaidersQueryVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import RaiderTable from 'src/components/RaiderTable/RaiderTable'

export const QUERY: TypedDocumentNode<
  FindRaidersQuery,
  FindRaidersQueryVariables
> = gql`
  query FindRaidersQuery {
    raiders {
      id
      class
      spec
      name
      role
      reserves
      Raids {
        createdAt
        updatedAt
        raid
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindRaidersQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  raiders,
}: CellSuccessProps<FindRaidersQuery, FindRaidersQueryVariables>) => {
  return <RaiderTable raiders={raiders} />
}
