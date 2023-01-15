import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal-overlay.module.css';

export default function ModalOverlay({ children, visible, setVisible }) {

  const rootClasses = [styles.popup];

  if (visible) {
    rootClasses.push(styles.opened);
  }

  const handleEscClose = (e) => {
    if (e.key === 'Escape') {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  return (
    createPortal(
      <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
        {children}
      </div>,
      document.getElementById("react-modals"))
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node
};
