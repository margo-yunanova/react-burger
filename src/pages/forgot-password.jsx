import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { restorePasswordRequest } from "../utils/burger-api";


const ForgotPasswordPage = () => {
  const [emailInput, setEmailInput] = useState('');

  const submitRestoreForm = (e) => {
    e.preventDefault();
    restorePasswordRequest(emailInput)
    // .then(({success}) => {
    //   if (success) {
    //     return (<Navigate to={'/reset-password'} replace={true} />)
    //   }
    // })
    // .catch(error => {
    //   console.log(error);
    // })
    // .finally(() => {});
};

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={submitRestoreForm}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput placeholder='Укажите e-mail' value={emailInput} onChange={(e) => setEmailInput(e.target.value)}/>
        <Button htmlType="submit" type='primary' size='large'>Восстановить</Button>
      </form>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2" >Вспомнили пароль?</span>
          <Link className={`${styles.link} ${styles.active} text text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
