import { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '@/components/ProductCard';

const meta = {
  title: 'ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      defaultValue: 'Title',
      name: 'Value provided as identical inside form'
    },
    description: {
      defaultValue: 'lorem ipsum dolor sit amet, consetetur'
    },
    price: {
      defaultValue: 100
    },
    imageUrl: {
      defaultValue: '/assets/images/products/forStory.jpg'
    }
  }
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    title: 'Sofa',
    description: 'Soft white sofa. Ideal for living room in your flat\xa0!',
    price: 100,
    imageUrl: '/assets/images/products/forStory.jpg'
  }
};
