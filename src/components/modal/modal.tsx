import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

type TModal = PropsWithChildren<{
  close: () => void;
  title?: string;
}>

const Modal: FC<TModal> = ({ children, close, title = '' }) => {
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [close]);

  return createPortal(
    <ModalOverlay close={close}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.close}
          type="button"
          aria-label="закрыть модальное окно"
          onClick={close}
        >
          <CloseIcon type="primary" />
        </button>
        {title && (
          <p className="text text_type_main-large pt-10 pl-10 pr-10">{title}</p>
        )}
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('react-modals') as Element,
  );
}

export default Modal;
