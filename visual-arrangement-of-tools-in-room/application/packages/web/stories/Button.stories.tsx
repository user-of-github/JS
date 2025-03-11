import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      name: 'Appearance',
      defaultValue: 'flat-primary',
      description: 'Main view'
    },
    rounded: {
      name: 'Is fully rounded',
      defaultValue: 'default',
      control: { type: 'radio' }
    },
    size: {
      name: 'Size usual or fullWidth',
      defaultValue: 'default',
      control: { type: 'radio' }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    appearance: 'flat-primary',
    size: 'default',
    children: 'Some text button'
  }
};

export const PrimaryRounded: Story = {
  args: {
    appearance: 'flat-primary',
    size: 'default',
    rounded: 'full',
    children: 'Some text button'
  }
};

export const Secondary: Story = {
  args: {
    appearance: 'flat-ordinary',
    size: 'default',
    children: 'Some text button'
  }
};
