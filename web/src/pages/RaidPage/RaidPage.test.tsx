import { render } from '@redwoodjs/testing/web'

import RaidPage from './RaidPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('RaidPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RaidPage />)
    }).not.toThrow()
  })
})
