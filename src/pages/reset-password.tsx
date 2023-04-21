import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEventHandler, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { resetPasswordRequest } from '../utils/burger-api';
import styles from './reset-password.module.css';

const ResetPasswordPage: FC = () => {
  const [form, setForm] = useState({ password: '', token: '',});
  const navigate = useNavigate();
  const successResetPassword = localStorage.getItem('successResetPassword'); //TODO - вместо boolean сейчас строка

  if (!successResetPassword) {
    return <Navigate to={'/forgot-password'} />;
  }

  const submitResetForm: FormEventHandler = (e) => {
    e.preventDefault();
    resetPasswordRequest(form).then(({ success }) => {
      if (success) {
        navigate('/login', { replace: true });
        localStorage.removeItem('successResetPassword');
      }
      return null;
    });
  };

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={submitResetForm}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <PasswordInput
          name="password"
          placeholder={'Введите новый пароль'}
          value={form.password}
          onChange={(e) => setForm((state) => ({ ...state, password: e.target.value }))}
        />
        <Input
          name="token"
          type={'text'}
          placeholder={'Введите код из письма'}
          value={form.token}
          onChange={(e) => setForm((state) => ({ ...state, token: e.target.value }))}
        />
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
        </Button>
      </form>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2">
            Вспомнили пароль?
          </span>
          <Link
            to={'/login'}
            className={`${styles.link} ${styles.active} text text_type_main-default`}
          >
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
