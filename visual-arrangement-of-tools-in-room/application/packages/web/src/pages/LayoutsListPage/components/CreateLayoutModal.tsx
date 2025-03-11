import React from 'react';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { localization } from '@/stores/Localization';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui/Input';
import { Modal, animatedModal } from '@/components/ui/Modal';
import { Typography } from '@/components/ui/Typography';

interface CreateLayoutButtonProps {
  onCreate: (dto: CreateLayoutDto) => void;
  open: boolean;
  onClose: () => void;
}

export interface CreateLayoutDto {
  name: string;
}

export const CreateLayoutModal: React.FC<CreateLayoutButtonProps> = ({ open, onCreate, onClose }) => {
  const [value, setValue] = React.useState<string>('');

  const change: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.currentTarget.value);
  };

  const onBackdropClick: React.MouseEventHandler = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const create = (event?: any) => {
    event?.preventDefault();
    if (value.trim() !== '') {
      onCreate({ name: value });
      onClose();
    }
  };

  return (
    <Modal
      initial={{ scale: 1 }}
      opened={open}
      onBackdropClick={onBackdropClick}
      className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.25)] w-full h-dvh overflow-y-auto flex flex-col justify-center items-center"
    >
      <motion.form
        {...animatedModal}
        exit={{ scale: 0.8, opacity: 0 }}
        className="w-96 bg-white rounded-md p-3 py-7 pt-12 m-auto relative flex flex-col justify-center gap-y-5"
        onSubmit={create}
      >
        <Button
          className="text-sm leading-[12rem] rounded p-0 w-8 h-8 flex items-center justify-center absolute top-5 right-5"
          onClick={onClose}
          appearance="gradient-mono-red"
        >
          &times;
        </Button>

        <Input value={value} onChange={change} labelText={localization.formatMessage('ui.layoutsList.name')} maxLength={30} />

        <Button type="submit" disabled={value.trim() === ''} appearance="gradient-mono-lime" onClick={create}>
          <FormattedMessage id="ui.general.create" />
        </Button>
      </motion.form>
    </Modal>
  );
};
