import React from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

interface ModalProps extends React.PropsWithChildren {
  className?: string;
  opened: boolean;
  initial?: any;
  animate?: any;
  exit?: any;
  onBackdropClick?: React.MouseEventHandler;
}

export const animatedModal = {
  initial: { scale: 1, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15 }
} as const;

export const Modal: React.FC<ModalProps> = ({ className, opened, children, onBackdropClick, ...animatedProps }) =>
  ReactDOM.createPortal(
    <AnimatePresence>
      {opened && (
        <motion.dialog {...animatedModal} open={opened} className={className} onClick={onBackdropClick} {...animatedProps}>
          {children}
        </motion.dialog>
      )}
    </AnimatePresence>,
    modalRoot
  );
