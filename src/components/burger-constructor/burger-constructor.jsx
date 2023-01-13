import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

export default function BurgerConstructor({ bun, bunFilling }) {
  return (
    <section className={`${styles.section} pt-25`}>
      <ul className={`${styles.lists} pb-10`}>
        <li className='pl-10 ml-3 pt-4 pb-4'>
          <ConstructorElement key={bun._id} thumbnail={bun.image} text={bun.name} price={bun.price} type="top" isLocked={true} />
        </li>
        <div className={styles.scroll}>
          {
            bunFilling.map(item =>
              <li className={`${styles.cell} pt-4 pb-4`}>
                <DragIcon type="primary" />
                <ConstructorElement key={item._id} thumbnail={item.image} text={item.name} price={item.price} />
              </li>
            )
          }
        </div>
        <li className='pl-10 ml-3 pt-4 pb-4'>
          <ConstructorElement key={bun._id} thumbnail={bun.image} text={bun.name} price={bun.price} type="bottom" isLocked={true} />
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

BurgerConstructor.propTypes = {
  bun: PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  }),
  bunFilling: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  }))
};
