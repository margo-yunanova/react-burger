import PropTypes from 'prop-types';
import { Counter, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import {ingredientType} from '../../utils/prop-types';
import { useEffect, useRef, useState } from 'react';

const Ingredient = ({ ingredient, setCurrentIngredient }) => (
  <div className={styles.cell} onClick={() => setCurrentIngredient(ingredient)}>
    <Counter count={1} size="default" extraClass="m-1" />
    <img src={ingredient.image} alt={ingredient.name} />
    <div className={`${styles.price} pt-1 pb-1`}>
      <p className="text text_type_digits-default">{ingredient.price}</p>
      <CurrencyIcon />
    </div>
    <p className="text text_type_main-default pb-7">{ingredient.name}</p>
  </div>
);

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
}

export default function BurgerIngredients({ ingredients, setCurrentIngredient }) {

  const [activeTab, setActiveTab] = useState('')

  const scrollSection = useRef(null);
  const titleMeal = useRef(null);
  const titleSauce = useRef(null);
  const titleBun = useRef(null);

  const titlesIngredients = [titleBun.current, titleMeal.current, titleSauce.current]

  const getTopCoordinatesActiveTab = (value) => {
    const { top: topCoordinateScrollSection } = scrollSection.current.getBoundingClientRect();
    const { top: topCoordinateActiveIngredient} = titlesIngredients.find(ingredient => ingredient.id === value).getBoundingClientRect();
    return topCoordinateActiveIngredient - topCoordinateScrollSection;
  }

  const focusTitle = (value) => {
    setActiveTab(value);
    scrollSection.current.scrollTo(0, getTopCoordinatesActiveTab(value))
  }


  const buns = ingredients.filter(i => i.type === "bun");
  const main = ingredients.filter(i => i.type === "main");
  const sauces = ingredients.filter(i => i.type === "sauce");

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <nav className={`${styles.tab} pb-10`}>
        <Tab value='Булки' active={activeTab === 'Булки'} onClick={focusTitle}>Булки</Tab>
        <Tab value='Соусы' active={activeTab === 'Соусы'} onClick={focusTitle}>Соусы</Tab>
        <Tab value='Начинки' active={activeTab === 'Начинки'} onClick={focusTitle}>Начинки</Tab>
      </nav>

      <div ref={scrollSection} className={styles.scroll}>
        <h2 ref={titleBun} id="Булки" className="text text_type_main-medium pt-6">Булки</h2>
        <div className={`${styles.table} pl-4`}>
          {
            buns.map(bun => <Ingredient key={bun._id} ingredient={bun} setCurrentIngredient={setCurrentIngredient}/>)
          }
        </div>

        <h2 ref={titleSauce} id="Соусы" className="text text_type_main-medium pt-10 pt-6">Соусы</h2>
        <div className={`${styles.table} pl-4`}>
          {
            sauces.map(sauce => <Ingredient key={sauce._id} ingredient={sauce} setCurrentIngredient={setCurrentIngredient}/>)
          }
        </div>

        <h2 ref={titleMeal} id="Начинки" className="text text_type_main-medium pt-10 pt-6">Начинки</h2>
        <div className={`${styles.table} pl-4`}>
          {
            main.map(item => <Ingredient key={item._id} ingredient={item} setCurrentIngredient={setCurrentIngredient}/>)
          }
        </div>
      </div>

    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
  setCurrentIngredient: PropTypes.func.isRequired,
}
