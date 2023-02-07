import PropTypes from 'prop-types';
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { ingredientType } from '../../utils/prop-types';
import { useRef, useState } from 'react';
import { SHOW_INGREDIENT_MODAL } from '../../services/actions/current-ingredient';
import { useDispatch } from 'react-redux';

const Ingredient = ({ ingredient }) => {

  const dispatch = useDispatch();

  return (
    <div className={styles.cell} onClick={() => dispatch({ type: SHOW_INGREDIENT_MODAL, payload: ingredient })}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.price} pt-1 pb-1`}>
        <p className="text text_type_digits-default">{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className="text text_type_main-default pb-7">{ingredient.name}</p>
    </div>
  );
};

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
};

export default function BurgerIngredients({ ingredients }) {

  const [activeTab, setActiveTab] = useState('Булки');

  const titleMealEl = useRef(null);
  const titleSauceEl = useRef(null);
  const titleBunEl = useRef(null);


  const scrollToTitle = (activeTab) => {
    setActiveTab(activeTab);
    const titlesIngredients = {
      'Булки': titleBunEl.current,
      'Соусы': titleSauceEl.current,
      'Начинки': titleMealEl.current,
    };
    titlesIngredients[activeTab].scrollIntoView({
      behavior: "smooth",
    });
  };

  const scroll = (evt) => {
    const numberPixelsScrollSectionMove = evt.target.scrollTop + evt.target.offsetTop;
    const topEdgeSauce = titleSauceEl.current.offsetTop;
    const topEdgeMeal = titleMealEl.current.offsetTop;

    if (numberPixelsScrollSectionMove < topEdgeSauce) {
      setActiveTab('Булки');
    } else if (numberPixelsScrollSectionMove >= topEdgeSauce && numberPixelsScrollSectionMove < topEdgeMeal) {
      setActiveTab('Соусы');
    } else {
      setActiveTab('Начинки');
    }
  };


  const buns = ingredients.filter(i => i.type === "bun");
  const main = ingredients.filter(i => i.type === "main");
  const sauces = ingredients.filter(i => i.type === "sauce");

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <nav className={`${styles.tab} pb-10`}>
        <Tab value='Булки' active={activeTab === 'Булки'} onClick={scrollToTitle}>Булки</Tab>
        <Tab value='Соусы' active={activeTab === 'Соусы'} onClick={scrollToTitle}>Соусы</Tab>
        <Tab value='Начинки' active={activeTab === 'Начинки'} onClick={scrollToTitle}>Начинки</Tab>
      </nav>

      <div className={styles.scroll} onScroll={scroll}>
        <h2 ref={titleBunEl} data-name="Булки" className="text text_type_main-medium pt-6">Булки</h2>
        <div className={`${styles.table} pl-4`}>
          {
            buns.map(bun => <Ingredient key={bun._id} ingredient={bun} />)
          }
        </div>

        <h2 ref={titleSauceEl} data-name="Соусы" className="text text_type_main-medium pt-10 pt-6">Соусы</h2>
        <div className={`${styles.table} pl-4`}>
          {
            sauces.map(sauce => <Ingredient key={sauce._id} ingredient={sauce} />)
          }
        </div>

        <h2 ref={titleMealEl} data-name="Начинки" className="text text_type_main-medium pt-10 pt-6">Начинки</h2>
        <div className={`${styles.table} pl-4`}>
          {
            main.map(item => <Ingredient key={item._id} ingredient={item} />)
          }
        </div>
      </div>

    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};
