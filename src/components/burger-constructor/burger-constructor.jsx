import PropTypes from 'prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useContext, useState } from 'react';
import { IngredientsContext } from '../../services/ingredientsContext';

export default function BurgerConstructor({ setOrderDetails, setOrderDetailVisible }) {

  const { bun, bunFilling } = useContext(IngredientsContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const apiUrlOrder = 'https://norma.nomoreparties.space/api/orders';
  const orderTotal = bun.price * 2 + bunFilling.reduce((sum, item) => sum + item.price, 0);

  const makeOrder = () => {
    setButtonDisabled(true)
    const ingredientsId = [bun._id, ...bunFilling.map(item => item._id)];
    fetch(apiUrlOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        'ingredients': ingredientsId,
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
      .then((data) => {
        setOrderDetails(data);
        setOrderDetailVisible(true);
      })
      .catch(e => console.log(e))
      .finally(() => setButtonDisabled(false))
  };

  return (
    <section className={`${styles.section} pt-25`}>
      <ul className={`${styles.lists} pb-10`}>
        <li className='pl-8 pt-4 pb-4'>
          <ConstructorElement thumbnail={bun.image} text={bun.name + ' (верх)'} price={bun.price} type="top" isLocked={true} />
        </li>
        <div className={styles.scroll}>
          {
            bunFilling.map((item, i) =>
              <li className={`${styles.cell}${i === 0 ? '' : ' pt-4'}`} key={item._id}>
                <DragIcon type="primary" />
                <ConstructorElement thumbnail={item.image} text={item.name} price={item.price} />
              </li>
            )
          }
        </div>
        <li className='pl-8 pt-4'>
          <ConstructorElement thumbnail={bun.image} text={bun.name + ' (низ)'} price={bun.price} type="bottom" isLocked={true} />
        </li>
      </ul>
      <div className={styles.total}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{orderTotal}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button disabled={buttonDisabled} htmlType="button" type="primary" size="large" onClick={makeOrder}>Оформить заказ</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  setOrderDetails: PropTypes.func.isRequired,
  setOrderDetailVisible: PropTypes.func.isRequired,
};
