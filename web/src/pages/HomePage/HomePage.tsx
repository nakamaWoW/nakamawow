import { Metadata } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import RaiderCell from 'src/components/RaiderCell'

const HomePage = () => {
  return (
    <div className="bg-gray-800">
      <Metadata title="Reserves" description="Website for Nakama WoW guild" />
      <Toaster />

      <RaiderCell />
    </div>
  )
}

export default HomePage
