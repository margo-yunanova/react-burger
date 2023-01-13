import Modal from '../modal/modal'
import styles from './modal-overlay.module.css'

export default function ModalOverlay() {
  return (
    <section className={styles.section}>
      <Modal />
    </section>
  )
}
