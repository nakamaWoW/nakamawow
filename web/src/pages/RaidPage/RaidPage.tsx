import { Metadata } from '@redwoodjs/web'

import RaidCell from 'src/components/RaidCell'

interface Props {
  id: number
}

const RaidPage = ({ id }: Props) => {
  return (
    <>
      <Metadata title="Raid" description="Raid page" />

      <RaidCell id={id} />
    </>
  )
}

export default RaidPage
