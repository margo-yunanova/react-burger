import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';


const ForgotPasswordPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput placeholder='Укажите e-mail'/>
        <Button htmlType="button" type='primary' size='large'>Восстановить</Button>
      </div>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2" >Вспомнили пароль?</span>
          <span>Войти</span>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
