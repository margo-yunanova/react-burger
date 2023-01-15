import PropTypes from 'prop-types';
import { Count, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const Ingredient = ({ ingredient, setCurrentIngredient }) => (
  <div className={styles.cell} onClick={() => setCurrentIngredient(ingredient)}>
    <img src={ingredient.image} alt={ingredient.name} />
    <div className={`${styles.price} pt-1 pb-1`}>
      <p className="text text_type_digits-default">{ingredient.price}</p>
      <CurrencyIcon />
    </div>
    <p className="text text_type_main-default pb-7">{ingredient.name}</p>
  </div>
);

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  })
}

export default function BurgerIngredients({ ingredients, setCurrentIngredient }) {
  const buns = ingredients.filter(i => i.type === "bun");
  const main = ingredients.filter(i => i.type === "main");
  const sauces = ingredients.filter(i => i.type === "sauce");

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <nav className='menu'>
        <Tab className="pt-6 pb-10">Булки</Tab>
        <Tab>Соусы</Tab>
        <Tab>Начинки</Tab>
      </nav>

      <div className={styles.scroll}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <div className={`${styles.table} pl-4`}>
          {
            buns.map(bun => <Ingredient key={bun._id} ingredient={bun} setCurrentIngredient={setCurrentIngredient}/>)
          }
        </div>

        <h2 className="text text_type_main-medium">Соусы</h2>
        <div className={`${styles.table} pl-4`}>
          {
            sauces.map(sauce => <Ingredient key={sauce._id} ingredient={sauce} setCurrentIngredient={setCurrentIngredient}/>)
          }
        </div>

        <h2 className="text text_type_main-medium">Начинки</h2>
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
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number
  }))
}
