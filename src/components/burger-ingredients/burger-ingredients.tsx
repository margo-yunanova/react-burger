import {
  Counter,
  CurrencyIcon,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, UIEventHandler, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredients.module.css';
import { TIngredient } from '../../utils/types';

const Ingredient: FC<{ingredient: TIngredient}> = ({ ingredient }) => {
  const { bun, bunFilling } = useSelector((state: any) => state.orderIngredients);

  const count =
    ingredient.type !== 'bun'
      ? bunFilling.reduce(
          (sum: number, item: any) => (item._id === ingredient._id ? sum + 1 : sum),
          0,
        )
      : bun?._id === ingredient._id
      ? 1
      : 0;

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div ref={dragRef} className={styles.cell} style={{ opacity }}>
      <Counter count={count} size="default" extraClass="m-1" />
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.price} pt-1 pb-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon type='primary'/>
      </div>
      <p className="text text_type_main-default pb-7">{ingredient.name}</p>
    </div>
  );
};

const BurgerIngredients: FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Булки');

  const titleMealEl = useRef<HTMLInputElement>(null);
  const titleSauceEl = useRef<HTMLInputElement>(null);
  const titleBunEl = useRef<HTMLInputElement>(null);

  const ingredients = useSelector(
    (state: any) => state.ingredients.listBurgerIngredients.ingredients,
  );

  const scrollToTitle = (activeTab: string) => {
    setActiveTab(activeTab);
    const titlesIngredients = {
      Булки: titleBunEl.current,
      Соусы: titleSauceEl.current,
      Начинки: titleMealEl.current,
    };
    titlesIngredients[activeTab as keyof typeof titlesIngredients]?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const scroll: UIEventHandler<HTMLDivElement> = (evt) => {
    const eventTarget = evt.target as HTMLElement;

    const numberPixelsScrollSectionMove =
      eventTarget.scrollTop + eventTarget.offsetTop;
    const topEdgeSauce = titleSauceEl.current!.offsetTop;
    const topEdgeMeal = titleMealEl.current!.offsetTop;

    if (numberPixelsScrollSectionMove < topEdgeSauce) {
      setActiveTab('Булки');
    } else if (
      numberPixelsScrollSectionMove >= topEdgeSauce &&
      numberPixelsScrollSectionMove < topEdgeMeal
    ) {
      setActiveTab('Соусы');
    } else {
      setActiveTab('Начинки');
    }
  };

  const buns = ingredients.filter((i: any) => i.type === 'bun');
  const main = ingredients.filter((i: any) => i.type === 'main');
  const sauces = ingredients.filter((i: any) => i.type === 'sauce');

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <nav className={`${styles.tab} pb-10`}>
        <Tab
          value="Булки"
          active={activeTab === 'Булки'}
          onClick={scrollToTitle}
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={activeTab === 'Соусы'}
          onClick={scrollToTitle}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={activeTab === 'Начинки'}
          onClick={scrollToTitle}
        >
          Начинки
        </Tab>
      </nav>

      <div className={styles.scroll} onScroll={scroll}>
        <h2
          ref={titleBunEl}
          data-name="Булки"
          className="text text_type_main-medium pt-6"
        >
          Булки
        </h2>
        <div className={`${styles.table} pl-4`}>
          {buns.map((bun: any) => (
            <Link
              key={bun._id}
              to={`/ingredients/${bun._id}`}
              state={{ backgroundLocation: location }}
              className={styles.link}
            >
              <Ingredient ingredient={bun} />
            </Link>
          ))}
        </div>

        <h2
          ref={titleSauceEl}
          data-name="Соусы"
          className="text text_type_main-medium pt-10 pt-6"
        >
          Соусы
        </h2>
        <div className={`${styles.table} pl-4`}>
          {sauces.map((sauce: any) => (
            <Link
              key={sauce._id}
              to={`/ingredients/${sauce._id}`}
              state={{ backgroundLocation: location }}
              className={styles.link}
            >
              <Ingredient ingredient={sauce} />
            </Link>
          ))}
        </div>

        <h2
          ref={titleMealEl}
          data-name="Начинки"
          className="text text_type_main-medium pt-10 pt-6"
        >
          Начинки
        </h2>
        <div className={`${styles.table} pl-4`}>
          {main.map((item: any) => (
            <Link
              key={item._id}
              to={`/ingredients/${item._id}`}
              state={{ backgroundLocation: location }}
              className={styles.link}
            >
              <Ingredient ingredient={item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
