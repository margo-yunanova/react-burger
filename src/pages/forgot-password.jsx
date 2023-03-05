import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { restorePasswordRequest } from "../utils/burger-api";


const ForgotPasswordPage = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    restorePasswordRequest(form)
    .then(({success}) => success ? navigate('/reset-password', {replace: true}) : null );
};

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput name='email' placeholder='Укажите e-mail' value={form.email ?? ''} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
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
