import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './register.module.css';


const RegisterPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input type={'text'} placeholder={'Имя'} />
        <EmailInput />
        <PasswordInput />
        <Button htmlType="button" type='primary' size='large'>Зарегистрироваться</Button>
      </div>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2" >Уже зарегистрированы?</span>
          <Link to={'/login'} className={`${styles.link} ${styles.active} text text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
