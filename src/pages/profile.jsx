import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';

const Profile = () => {
  const activeLink = ({isActive}) => `${(isActive ? styles.active : '')} + ${styles.link} + text text_type_main-medium`;

  return (
    <section className={styles.grid}>
      <div>
        <nav className={`${styles.menu} pb-10`}>
          <NavLink to='/profile' end className={activeLink}>Профиль</NavLink>
          <NavLink to='/profile/orders' end className={activeLink}>История заказов</NavLink>
          <NavLink to='/profile/orders:id' end className={activeLink}>Выход</NavLink>
        </nav>
        <span className={`${styles.info} text text_type_main-default`}>В этом разделе вы можете изменить свои персональные данные</span>
      </div>
      <div className={styles.login}>
        <Input type={'text'} placeholder='Имя' icon="EditIcon" />
        <EmailInput placeholder='Логин' isIcon={true} />
        <PasswordInput placeholder={'Пароль'} icon="EditIcon" onChange={()=>{}}/>
      </div>
    </section>
  );
};

export default Profile;
