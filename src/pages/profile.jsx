import { PasswordInput, Input, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './profile.module.css';

const Profile = () => {
  return (
    <section className={styles.grid}>
      <div>
        <nav className={`${styles.menu} pb-10`}>
          <Link>Профиль</Link>
          <Link>История заказов</Link>
          <Link>Выход</Link>
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
