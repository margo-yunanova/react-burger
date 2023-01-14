import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styles from './modal-overlay.module.css'

export default function ModalOverlay({children, visible}) {

  const rootClasses = [styles.popup]

  if (visible) {
    rootClasses.push(styles.opened);
  }


  return (
    createPortal(<div className={rootClasses.join(' ')}>
      {children}
    </div>, document.getElementById("react-modals"))
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node
}
