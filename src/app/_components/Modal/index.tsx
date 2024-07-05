'use-client';

import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
  className: string,
  children: string,
  isOpen: boolean,
  onClose: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ className, children, isOpen, onClose }) => {
  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;