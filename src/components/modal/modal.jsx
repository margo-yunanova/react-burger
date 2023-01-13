import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

export default function Modal({children}) {

  return (
    <ModalOverlay>
      <div className={styles.popup}>
        <button className={styles.close} type="button" aria-label="закрыть модальное окно"></button>
        {children}
      </div>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  children: PropTypes.node
}
