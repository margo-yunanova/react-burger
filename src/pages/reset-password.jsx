import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';


const ResetPasswordPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput placeholder={'Введите новый пароль'}/>
        <Input type={'text'} placeholder={'Введите код из письма'} />
        <Button htmlType="button" type='primary' size='large'>Сохранить</Button>
      </div>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2" >Вспомнили пароль?</span>
          <Link className={`${styles.link} ${styles.active} text text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
