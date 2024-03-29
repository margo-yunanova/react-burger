import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
import { FC } from 'react';

const AppHeader: FC = () => {
  const activeLinkLeftNav = ({ isActive }: { isActive: boolean}) =>
    `${styles.cell} ${styles.link} ${
      isActive ? styles.active : ''
    }  pr-5 pb-4 pt-4`;
  const activeLinkRightNav = ({ isActive }: { isActive: boolean}) =>
    `${styles.cell} ${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <header className={styles.header}>
      <nav className={`${styles.cell} ${styles.leftnav}`}>
        <NavLink to={'/'} end className={activeLinkLeftNav}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default">Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink to={'/feed'} className={activeLinkLeftNav}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default">Лента заказов</p>
            </>
          )}
        </NavLink>
      </nav>
      <Link to="/" className={`${styles.logo} mt-6 mb-6`}>
        <Logo />
      </Link>
      <nav className={styles.rightnav}>
        <NavLink to={'/profile'} className={activeLinkRightNav}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default">Личный кабинет</p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
