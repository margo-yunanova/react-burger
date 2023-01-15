import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

export default function Modal({ children, visible, setVisible }) {

  return (
    <ModalOverlay visible={visible} setModal={setVisible}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} type="button" aria-label="закрыть модальное окно" onClick={() => setVisible(false)}></button>
        {children}
      </div>
    </ModalOverlay>
  );
}

Modal.propTypes = {
  children: PropTypes.node
};
