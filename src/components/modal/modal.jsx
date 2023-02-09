import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Modal({ children, close, title = '' }) {

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [close]);

  return (
    createPortal(
      <ModalOverlay close={close}>
        <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
          <button className={styles.close} type="button" aria-label="закрыть модальное окно" onClick={close}>
            <CloseIcon type="primary" />
          </button>
          {title && <p className="text text_type_main-large pt-10 pl-10 pr-10">{title}</p>}
          {children}
        </div>
      </ModalOverlay>,
      document.getElementById("react-modals"))
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.node,
};
