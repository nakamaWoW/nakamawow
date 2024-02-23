import { render } from '@redwoodjs/testing/web'

import RaidTable from './RaidTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RaidTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RaidTable />)
    }).not.toThrow()
  })
})
