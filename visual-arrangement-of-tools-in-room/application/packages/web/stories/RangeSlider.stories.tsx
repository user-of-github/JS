import { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from '../src/components/ui';

const meta = {
  title: 'UI/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      name: 'id',
      defaultValue: 'id'
    },
    min: {
      name: 'Min value',
      defaultValue: 1
    },
    max: {
      name: 'Max value',
      defaultValue: 10
    },
    value: {
      name: 'Current value (from parent component state)',
      defaultValue: 5
    },
    label: {
      name: 'Text',
      defaultValue: 'Range slider'
    },
    onChange: {
      name: 'Change callback'
    }
  }
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    value: 5,
    label: 'Test',
    min: 0,
    max: 10,
    id: 'test id'
  }
};
