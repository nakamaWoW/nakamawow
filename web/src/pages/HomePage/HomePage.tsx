import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import RaiderCell from 'src/components/RaiderCell'

const HomePage = () => {
  return (
    <>
      <Metadata title="Reserves" description="Website for Nakama WoW guild" />
      <Toaster />

      <RaiderCell />
    </>
  )
}

export default HomePage
