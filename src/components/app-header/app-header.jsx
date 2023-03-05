import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './app-header.module.css';

export default function AppHeader() {
  const activeLinkLeftNav = ({isActive}) => `${styles.cell} ${styles.link} ${isActive ? styles.active : ''}  pr-5 pb-4 pt-4`;
  const activeLinkRightNav = ({isActive}) => `${styles.cell} ${styles.link} ${isActive ? styles.active : ''} ${styles.rightnav}`;

  return (
    <header className={styles.header}>
      <nav className={`${styles.cell} ${styles.leftnav}`}>
        <NavLink to={'/'} end className={activeLinkLeftNav}>
          {({isActive}) => (<>
            <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default">Конструктор</p>
          </>)}
        </NavLink>
        <NavLink to={'/feed'} className={activeLinkLeftNav}>
          {({isActive}) => (<>
            <ListIcon type={isActive ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default">Лента заказов</p>
          </>)}
        </NavLink>
      </nav>
      <div className={`${styles.logo} mt-6 mb-6`}>
        <Logo />
      </div>
      <nav>
        <NavLink to={'/profile'} className={activeLinkRightNav}>
          {({isActive}) => (<>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <p className="text text_type_main-default">Личный кабинет</p>
          </>)}
        </NavLink>
      </nav>
    </header>
  );
}
