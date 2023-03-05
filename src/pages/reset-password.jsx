import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';
import { resetPasswordRequest } from "../utils/burger-api";


const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const submitResetForm = (e) => {
    e.preventDefault();
    resetPasswordRequest(password, token)
  }

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={submitResetForm}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput placeholder={'Введите новый пароль'} value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Input type={'text'} placeholder={'Введите код из письма'} value={token} onChange={(e) => setToken(e.target.value)}/>
        <Button htmlType="submit" type='primary' size='large' >Сохранить</Button>
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

export default ResetPasswordPage;
