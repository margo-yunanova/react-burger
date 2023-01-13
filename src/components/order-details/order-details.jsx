import styles from './order-details.module.css'


export default function OrderDetails () {
  return (
    <div className={styles.popup}>
      <p className="text text_type_digits-large pt-30 pb-8">034536</p>
      <p className="text text_type_main-medium pb-15">индентификатор закака</p>
      <div className={styles.checkbox}></div>
      <p className="text text_type_main-default pt-15 pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
