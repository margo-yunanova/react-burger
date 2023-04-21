import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import IngredientImageRoundBorder from '../components/ingredient-image-round-border/ingredient-image-round-border';
import { statusOrderName } from '../utils/constants';
import styles from './order-placed-details.module.css';
import { FC } from 'react';
import { TMadeOrder } from '../utils/types';

type TIngredient = {
  id: string;
  quantity: number;
  index: number;
}
const Ingredient: FC<TIngredient> = ({ id, index, quantity }) => {
  const ingredients = useSelector(
    (state: any) => state.ingredients.listBurgerIngredients.ingredients,
  );

  const ingredient = ingredients.find((item: any) => item._id === id);

  return (
    <div className={`${styles.ingredient} ${index > 0 && 'pt-4'}`}>
      <IngredientImageRoundBorder id={ingredient._id} />
      <p className="text text_type_main-medium">{ingredient.name}</p>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{`${quantity} x ${ingredient.price}`}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
};

const OrderPlacedDetails = () => {
  const { id } = useParams();

  const orders = useSelector((state: any) => state.wsReducer.messages.orders);

  const ingredients = useSelector(
    (state: any) => state.ingredients.listBurgerIngredients.ingredients,
  );

  const success = useSelector(
    (state: any) => state.ingredients.listBurgerIngredients.success,
  );

  if (!success || !orders) {
    return null;
  }

  const order = orders.find((item: any) => item._id === id) as TMadeOrder;

  const commonQuantityUniqueIngredients: { [key: string]: number; } = {};

  for (const id of order?.ingredients) {
    commonQuantityUniqueIngredients[id] =
      (commonQuantityUniqueIngredients[id] ?? 0) + 1;
  }

  const uniqueId = Object.keys(commonQuantityUniqueIngredients);

  const totalOrder = order.ingredients.reduce((sum: number, id: string): number => {
    return sum + ingredients.find((item: any) => id === item._id).price;
  }, 0);

  const statusClass = classNames('text text_type_main-default', {
    [styles.orderDone]: order.status === 'done',
  });

  return (
    <section className={styles.section}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default pb-10`}
      >
        {`#${order?.number}`}
      </p>
      <p className="text text_type_main-medium pb-3">{order?.name}</p>
      <p className={`${statusClass} text text_type_main-default pb-15`}>
        {statusOrderName[order?.status]}
      </p>
      <p className="text text_type_main-medium pb-6">Состав:</p>
      <div className={styles.scroll}>
        {uniqueId.map((id, index) => (
          <Ingredient
            key={index}
            id={id}
            index={index}
            quantity={commonQuantityUniqueIngredients[id]}
          />
        ))}
      </div>
      <div className={`${styles.total} pt-6`}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order?.createdAt)}
        />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{totalOrder}</p>
          <CurrencyIcon type='primary'/>
        </div>
      </div>
    </section>
  );
};

export default OrderPlacedDetails;
