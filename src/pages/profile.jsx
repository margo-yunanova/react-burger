import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getUser, logoutUser } from '../services/actions/user';
import styles from './profile.module.css';

const Profile = () => {
  const activeLink = ({ isActive }) =>
    classNames('text text_type_main-medium', {
      [styles.link]: true,
      [styles.active]: isActive,
    });

  const isLogout = useSelector((state) => state.user.isLogout);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successRequest = useSelector((state) => state.user.success);

  useEffect(() => {
    if (!successRequest) {
      dispatch(getUser());
    }
  }, [dispatch, successRequest]);

  const handleExit = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (isLogout) {
      navigate('/login');
    }
  });

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
          <Link
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
