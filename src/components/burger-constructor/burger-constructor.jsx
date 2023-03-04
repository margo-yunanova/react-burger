import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../services/actions/orderDetails';
import { useDrag, useDrop } from "react-dnd";
import { MOVE_INGREDIENT_IN_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, SPLICE_INGREDIENT_IN_CONSTRUCTOR } from '../../services/actions/constructor';
import { useRef } from 'react';
import { ADD_INGREDIENT_INTO_CONSTRUCTOR } from '../../services/actions/constructor';
import { v4 as uuidv4 } from 'uuid';

function BunFillingCard({ item, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ opacity }, dragRef, dragPreview] = useDrag({
    type: 'dragBunFillingList',
    item: { item, index },
    collect: monitor => ({
      opacity: monitor.isDragging(),
    })
  });

  const [ {isOver, getItem, isCanDrop}, dropRef] = useDrop({
    accept: ['dragBunFillingList', 'ingredient'],
    hover: (item, monitor) => {
      if (monitor.getItemType() !== 'dragBunFillingList') return;

      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const { height: heightHoveredIngredient, top: topHoveredIngredient } = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const locationMouseOverHoverIngredient = clientOffset.y - topHoveredIngredient;

      if (dragIndex < hoverIndex && locationMouseOverHoverIngredient < heightHoveredIngredient / 2) return;
      if (dragIndex > hoverIndex && locationMouseOverHoverIngredient > heightHoveredIngredient / 2) return;

      dispatch({
        type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
        payload: {
          dragIndex,
          hoverIndex,
        }
      });
      item.index = hoverIndex;
    },

    drop: (item, monitor) => {
      if (monitor.getItemType() !== 'ingredient') return;

      const { height: heightHoveredIngredient, top: topHoveredIngredient } = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const locationMouseOverHoverIngredient = clientOffset.y - topHoveredIngredient;
      const isFirstHalfIngredient = locationMouseOverHoverIngredient < heightHoveredIngredient / 2;

      dispatch({
        type: SPLICE_INGREDIENT_IN_CONSTRUCTOR,
        payload: {
          item: {
            ...item,
            code: uuidv4(),
          },
          index,
          isFirstHalfIngredient,
        }
      });
    },

    collect: monitor => ({
      isOver: monitor.getItemType() === 'ingredient' && monitor.isOver(),
      getItem: monitor.getItemType() === 'ingredient' && monitor.getItem(),
      isCanDrop: monitor.getItemType() === 'ingredient' && monitor.canDrop(),
    })
  });

  const handleClose = (ingredient) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: {
        ingredient
      },
    });
  };

  dragPreview(dropRef(ref));

  const style = {
    height: '5px',
    backgroundColor: '#4c4cff',
    maxWidth: '450px',
    margin: 'auto',
    borderRadius: '5px',
    marginTop: index === 0 ? '' : '16px',
    marginBottom: index === 0 ? '16px' : '',
  }

  return (
    <>
    {isOver && <div style={style}></div>}
    {/* {isOver && isCanDrop && <li className={`${styles.cell}${index === 0 ? '' : ' pt-4'}`} >
      <DragIcon type="primary" />
      <ConstructorElement thumbnail={getItem.image} text={getItem.name} price={getItem.price} />
    </li>} */}

    <li ref={ref} className={`${styles.cell}${index === 0 ? '' : ' pt-4'}`}  style={{ opacity: opacity ? 0 : 1 }}>
      <div ref={dragRef}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement thumbnail={item.image} text={item.name} price={item.price} handleClose={() => handleClose(item)} />
    </li>
    </>
  );
}

BunFillingCard.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
};

export default function BurgerConstructor() {

  const dispatch = useDispatch();

  const { bun, bunFilling } = useSelector(state => state.orderIngredients);

  const orderDetailsRequest = useSelector(store => store.orderDetails.request);

  const orderTotal = bun ? bun.price * 2 : 0 + bunFilling.reduce((sum, item) => sum + item.price, 0);

  const makeOrder = () => {
    const ingredientsId = [bun._id, ...bunFilling.map(item => item._id), bun._id];
    dispatch(getOrderDetails(ingredientsId));
  };

  const [ {isOverCurrent}, dropTargetRef] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    drop: (item) => {
      if (isOverCurrent) {
        dispatch({
          type: ADD_INGREDIENT_INTO_CONSTRUCTOR,
          payload: {
            item,
            code: uuidv4(),
          }
        });
      }
    }
  });

  return (
    <section className={`${styles.section} pt-25`}>
      <ul ref={dropTargetRef} className={`${styles.lists} pb-10`}>
        {bun && <li className='pl-8 pt-4 pb-4'>
          <ConstructorElement thumbnail={bun.image} text={bun.name + ' (верх)'} price={bun.price} type="top" isLocked={true} />
        </li>}
        {bunFilling && <div className={styles.scroll}>
          {
            bunFilling.map((item, i) => <BunFillingCard key={item.code} item={item} index={i} />)
          }
        </div>}
        {bun && <li className='pl-8 pt-4'>
          <ConstructorElement thumbnail={bun.image} text={bun.name + ' (низ)'} price={bun.price} type="bottom" isLocked={true} />
        </li>}
      </ul>
      <div className={styles.total}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{orderTotal}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button disabled={!bun || orderDetailsRequest} htmlType="button" type="primary" size="large" onClick={makeOrder}>Оформить заказ</Button>
      </div>
    </section>
  );
}
