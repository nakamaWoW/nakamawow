import { render } from '@redwoodjs/testing/web'

import RaiderTable from './RaiderTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RaiderTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RaiderTable />)
    }).not.toThrow()
  })
})
