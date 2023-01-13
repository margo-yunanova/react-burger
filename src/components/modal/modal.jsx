import { createPortal } from 'react-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import styles from './modal.module.css'

export default function Modal () {
  return (

    <section className={styles.section}>
      <button className={styles.close} type="button" aria-label="закрыть модальное окно"></button>
      {/* <IngredientDetails /> */}
      <OrderDetails />
    </section>
    )
}
