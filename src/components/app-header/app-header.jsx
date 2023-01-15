import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`${styles.cell} ${styles.leftnav}`}>
        <div className={`${styles.cell} pr-5 pb-4 pt-4`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default">Конструктор</p>
        </div>
        <div className={`${styles.cell} pr-5 pb-4 pt-4`}>
          <ListIcon type="primary" />
          <p className="text text_type_main-default">Лента заказов</p>
        </div>
      </div>
      <div className={`${styles.logo} mt-6 mb-6`}>
        <Logo />
      </div>
      <div className={`${styles.cell} ${styles.rightnav}`}>
        <ProfileIcon type="primary" />
        <p className="text text_type_main-default">Личный кабинет</p>
      </div>
    </header>
  );
}
