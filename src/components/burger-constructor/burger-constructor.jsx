import { ConstructorElement, Button, CurrencyIcon, LockIcon, DeleteIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';



export default function BurgerConstructor({ bun, bunFilling }) {
  return (
    <section className={`pt-25 ${styles.section}`}>
      <ul className={`pb-10 ${styles.lists}`}>
        <li className='pl-10 ml-3 pt-4 pb-4'>
          <ConstructorElement thumbnail={bun.image} text={bun.name} price={bun.price} type="top" />
        </li>
        <div className={styles.scroll}>
          {
            bunFilling.map(item =>
              <li className={`pt-4 pb-4 ${styles.cell}`}>
                <DragIcon type="primary" />
                <ConstructorElement key={item._id} thumbnail={item.image} text={item.name} price={item.price} isLocked={true} />
              </li>
            )
          }
        </div>
        <li className='pl-10 ml-3 pt-4 pb-4'>
          <ConstructorElement thumbnail={bun.image} text={bun.name} price={bun.price} type="bottom"/>
        </li>
      </ul>
      <div className={styles.total}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">0</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}
