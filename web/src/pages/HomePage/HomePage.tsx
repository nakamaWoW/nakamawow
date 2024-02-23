import { Metadata } from '@redwoodjs/web'

import RaiderCell from 'src/components/RaiderCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Reserves" description="Website for Nakama WoW guild" />

      <RaiderCell />
    </>
  )
}

export default HomePage
