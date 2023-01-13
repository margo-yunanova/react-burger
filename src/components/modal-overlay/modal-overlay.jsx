import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css'

export default function ModalOverlay({children}) {
  return (
    <div className={styles.popup}>
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node
}
