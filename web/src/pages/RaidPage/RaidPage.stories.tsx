import type { Meta, StoryObj } from '@storybook/react'

import RaidPage from './RaidPage'

const meta: Meta<typeof RaidPage> = {
  component: RaidPage,
}

export default meta

type Story = StoryObj<typeof RaidPage>

export const Primary: Story = {}
