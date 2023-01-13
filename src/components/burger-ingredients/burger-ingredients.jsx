import { Count, Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

const Ingredient = ({ ingredient }) => (
  <div className={styles.cell}>
    <img src={ingredient.image} alt={ingredient.name} />
    <div className={`${styles.price} pt-1 pb-1`}>
      <p className="text text_type_digits-default">{ingredient.price}</p>
      <CurrencyIcon />
    </div>
    <p className="text text_type_main-default pb-7">{ingredient.name}</p>
  </div>
);

export default function BurgerIngredients({ ingredients }) {
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
            buns.map(bun => <Ingredient key={bun._id} ingredient={bun} />)
          }
        </div>

        <h2 className="text text_type_main-medium">Соусы</h2>
        <div className={`${styles.table} pl-4`}>
          {
            sauces.map(sauce => <Ingredient key={sauce._id} ingredient={sauce} />)
          }
        </div>

        <h2 className="text text_type_main-medium">Начинки</h2>
        <div className={`${styles.table} pl-4`}>
          {
            main.map(item => <Ingredient key={item._id} ingredient={item} />)
          }
        </div>
      </div>

    </section>
  );
}
