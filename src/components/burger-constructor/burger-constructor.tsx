import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router';
import {
  ADD_INGREDIENT_INTO_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from '../../services/actions/constructor';
import { getOrderDetails } from '../../services/actions/orderDetails';
import { getUser } from '../../services/actions/user';
import styles from './burger-constructor.module.css';
import { TIngredient } from '../../utils/types';

type TBunFillingCard = {
  item: TIngredient;
  index: number;
}

const BunFillingCard: FC<TBunFillingCard> = ({ item, index }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  const [{ opacity }, drag, dragPreview] = useDrag({
    type: 'dragBunFillingList',
    item: { item, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop<{item: TIngredient; index: number}>({
    accept: 'dragBunFillingList',
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const { height: heightHoveredIngredient, top: topHoveredIngredient } =
        ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const locationMouseOverHoverIngredient =
        clientOffset!.y - topHoveredIngredient;

      if (
        dragIndex < hoverIndex &&
        locationMouseOverHoverIngredient < heightHoveredIngredient / 2
      )
        return;
      if (
        dragIndex > hoverIndex &&
        locationMouseOverHoverIngredient > heightHoveredIngredient / 2
      )
        return;

      dispatch({
        type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
        payload: {
          dragIndex,
          hoverIndex,
        },
      });
      item.index = hoverIndex;
    },
  });

  const handleClose = (ingredient: TIngredient) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: {
        ingredient,
      },
    });
  };

  dragPreview(drop(ref));
  return (
    <li
      ref={ref}
      className={`${styles.cell}${index === 0 ? '' : ' pt-4'}`}
      style={{ opacity: opacity ? 0 : 1 }}
    >
      <div ref={drag}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        thumbnail={item.image}
        text={item.name}
        price={item.price}
        handleClose={() => handleClose(item)}
      />
    </li>
  );
}

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { bun, bunFilling } = useSelector((state: any) => state.orderIngredients);

  const orderDetailsRequest = useSelector(
    (store: any) => store.orderDetails.request,
  );

  const orderTotal =
    (bun ? bun.price * 2 : 0) +
    bunFilling.reduce((sum: number, item: any) => sum + item.price, 0);

  const successRequest = useSelector((state: any) => state.user.success);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser() as any);
  }, [dispatch]);

  const makeOrder = () => {
    if (successRequest) {
      const ingredientsId = [
        bun._id,
        ...bunFilling.map((item: any) => item._id),
        bun._id,
      ];
      dispatch(getOrderDetails(ingredientsId) as any);
    } else {
      navigate(`/login`, { state: { from: location } });
    }
  };

  const [, dropTargetRef] = useDrop<TIngredient>({
    accept: 'ingredient',
    drop: (item) => handleDrop(item),
  });

  const handleDrop = (ingredient: TIngredient) => {
    dispatch({
      type: ADD_INGREDIENT_INTO_CONSTRUCTOR,
      payload: {
        ingredient,
        code: uuidv4(),
      },
    });
  };

  return (
    <section className={`${styles.section} pt-25`}>
      <ul ref={dropTargetRef} className={`${styles.lists} pb-10`}>
        {bun && (
          <li className="pl-8 pt-4 pb-4">
            <ConstructorElement
              thumbnail={bun.image}
              text={bun.name + ' (верх)'}
              price={bun.price}
              type="top"
              isLocked={true}
            />
          </li>
        )}
        {bunFilling && (
          <div className={styles.scroll}>
            {bunFilling.map((item: any, i: number) => (
              <BunFillingCard key={item.code} item={item} index={i} />
            ))}
          </div>
        )}
        {bun && (
          <li className="pl-8 pt-4">
            <ConstructorElement
              thumbnail={bun.image}
              text={bun.name + ' (низ)'}
              price={bun.price}
              type="bottom"
              isLocked={true}
            />
          </li>
        )}
      </ul>
      <div className={styles.total}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{orderTotal}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          disabled={!bun || orderDetailsRequest}
          htmlType="button"
          type="primary"
          size="large"
          onClick={makeOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;
