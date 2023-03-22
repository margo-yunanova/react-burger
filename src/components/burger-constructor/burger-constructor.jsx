import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router";
import {
  ADD_INGREDIENT_INTO_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
} from "../../services/actions/constructor";
import { getOrderDetails } from "../../services/actions/orderDetails";
import { getUser } from "../../services/actions/user";
import { ingredientType } from "../../utils/prop-types";
import styles from "./burger-constructor.module.css";

function BunFillingCard({ item, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ opacity }, drag, dragPreview] = useDrag({
    type: "dragBunFillingList",
    item: { item, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "dragBunFillingList",
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const { height: heightHoveredIngredient, top: topHoveredIngredient } =
        ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const locationMouseOverHoverIngredient =
        clientOffset.y - topHoveredIngredient;

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

  const handleClose = (ingredient) => {
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
      className={`${styles.cell}${index === 0 ? "" : " pt-4"}`}
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

BunFillingCard.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
};

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { bun, bunFilling } = useSelector((state) => state.orderIngredients);

  const orderDetailsRequest = useSelector(
    (store) => store.orderDetails.request
  );

  const orderTotal =
    (bun ? bun.price * 2 : 0) +
    bunFilling.reduce((sum, item) => sum + item.price, 0);
  const successRequest = useSelector((state) => state.user.success);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const makeOrder = () => {
    if (successRequest) {
      const ingredientsId = [
        bun._id,
        ...bunFilling.map((item) => item._id),
        bun._id,
      ];
      dispatch(getOrderDetails(ingredientsId));
    } else {
      navigate(`/login`, { state: { from: location } });
    }
  };

  const handleDrop = (ingredient) => {
    dispatch({
      type: ADD_INGREDIENT_INTO_CONSTRUCTOR,
      payload: {
        ingredient,
        code: uuidv4(),
      },
    });
  };

  const [, dropTargetRef] = useDrop({
    accept: "ingredient",
    drop: (item) => handleDrop(item),
  });

  return (
    <section className={`${styles.section} pt-25`}>
      <ul ref={dropTargetRef} className={`${styles.lists} pb-10`}>
        {bun && (
          <li className="pl-8 pt-4 pb-4">
            <ConstructorElement
              thumbnail={bun.image}
              text={bun.name + " (верх)"}
              price={bun.price}
              type="top"
              isLocked={true}
            />
          </li>
        )}
        {bunFilling && (
          <div className={styles.scroll}>
            {bunFilling.map((item, i) => (
              <BunFillingCard key={item.code} item={item} index={i} />
            ))}
          </div>
        )}
        {bun && (
          <li className="pl-8 pt-4">
            <ConstructorElement
              thumbnail={bun.image}
              text={bun.name + " (низ)"}
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
