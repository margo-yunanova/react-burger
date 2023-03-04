import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
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
          <span>Зарегистрироваться</span>
        </div>
        <div>
          <span className="text text_type_main-default pr-2">Забыли пароль?</span>
          <span>Восстановить пароль</span>
        </div>
      </div>
    </section>
  );
};

export default Login;
