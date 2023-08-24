import classNames from 'classnames';
import { FC, MouseEventHandler, useEffect } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { getUser, logoutUser } from '../services/actions/user';
import styles from './profile.module.css';
import { useAppDispatch, useAppSelector } from '../utils/types';

const Profile: FC = () => {
  const activeLink = ({ isActive }: { isActive: boolean}) =>
    classNames('text text_type_main-medium', {
      [styles.link]: true,
      [styles.active]: isActive,
    });

  const dispatch = useAppDispatch();

  const successRequest = useAppSelector((state) => state.user.success);

  useEffect(() => {
    if (!successRequest) {
      dispatch(getUser());
    }
  }, [dispatch, successRequest]);

  const handleExit: MouseEventHandler = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <section className={styles.grid}>
      <div>
        <nav className={`${styles.menu} pb-10`}>
          <NavLink to="/profile" end className={activeLink}>
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" end className={activeLink}>
            История заказов
          </NavLink>
          <Link to=''
            className={`${styles.link} text text_type_main-medium`}
            onClick={handleExit}
          >
            Выход
          </Link>
        </nav>
        <span className={`${styles.info} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <Outlet />
    </section>
  );
};

export default Profile;
