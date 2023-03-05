import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
  return (
    <section className={styles.section}>
      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput />
        <PasswordInput />
        <Button htmlType="button" type='primary' size='large' width={128}>Войти</Button>
      </div>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2" >Вы — новый пользователь?</span>
          <Link className={`${styles.link} ${styles.active} text text_type_main-default`}>Зарегистрироваться</Link>
        </div>
        <div>
          <span className="text text_type_main-default pr-2">Забыли пароль?</span>
          <Link className={`${styles.link} ${styles.active} text text_type_main-default`}>Восстановить пароль</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
