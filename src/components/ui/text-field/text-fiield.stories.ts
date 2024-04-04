import { Meta, StoryObj } from '@storybook/react';
import { TextField } from '..';

const meta: Meta<typeof TextField> = {
  title: 'UI/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  args: {
    placeholder: 'Placeholder',
    disabled: false,
    onChange: () => {},
  },
};
