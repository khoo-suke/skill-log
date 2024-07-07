'use-client';

import React from 'react';
import Modal from 'react-modal';
import styles from '@/app/_components/Modal/index.module.scss';

interface ModalProps {
  className?: string,
  children?: React.ReactNode,
  isOpen: boolean,
  onRequestClose: () => void,
}

const CustomModal: React.FC<ModalProps> = ({ className, children, isOpen, onRequestClose }) => {

  return (
    <Modal
      className={`${styles.modalContent} ${className}`}
      overlayClassName={styles.modalOverlay}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;