import styles from './ingredient-details.module.css';

export default function IngredientDetails() {
  return (
    <div className={styles.popup}>
      <p className="text text_type_main-large pt-10 pl-10 pr-10">Детали ингридиента</p>
      <div className={styles.details}>
        <img className='pb-4' />
        <p className="text text_type_main-medium pb-8">тест</p>
        <div className={styles.table}>
          <p className="text text_type_main-default">Калории,ккал</p>
          <p className="text text_type_digits-default">000</p>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">000</p>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">000</p>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">000</p>
        </div>
      </div>

    </div>
  );
}
