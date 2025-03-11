import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/components/ui';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      name: 'Appearance',
      defaultValue: 'primary',
      description: 'Main view'
    },
    id: {
      name: 'Id',
      description: 'For connection label and checkbox'
    },
    label: {
      name: 'Label / title',
      defaultValue: 'Checkbox',
      description: 'Note near checkbox'
    }
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PrimaryUnchecked: Story = {
  args: { appearance: 'primary', label: 'Unchecked', id: 'stories.123' }
};

export const PrimaryChecked: Story = {
  args: {
    appearance: 'primary',
    label: 'Unchecked',
    id: 'stories.123',
    checked: true
  }
};

export const TealChecked: Story = {
  args: {
    appearance: 'teal',
    label: 'Unchecked',
    id: 'stories.123',
    checked: true
  }
};
