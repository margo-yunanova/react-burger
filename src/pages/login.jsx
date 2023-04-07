import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { authorizeUser, getUser } from '../services/actions/user';
import styles from './login.module.css';

const Login = () => {
  const [form, setForm] = useState({});
  const [isRequestSent, setRequestSent] = useState(false);
  const successRequest = useSelector((state) => state.user.success);
  const request = useSelector((state) => state.user.request);
  const dispatch = useDispatch();

  const { state } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authorizeUser(form));
  };

  useEffect(() => {
    dispatch(getUser());
    setRequestSent(true);
  }, [dispatch]);

  if (!isRequestSent || request) {
    return null;
  }

  if (successRequest && !request) {
    if (state?.from) {
      return <Navigate to={state.from} />;
    }
    return <Navigate to="/" />;
  }

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          name="email"
          value={form.email ?? ''}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
        <PasswordInput
          name="password"
          value={form.password ?? ''}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
        <Button htmlType="submit" type="primary" size="large" width={128}>
          Войти
        </Button>
      </form>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2">
            Вы — новый пользователь?
          </span>
          <Link
            to={'/register'}
            className={`${styles.link} ${styles.active} text text_type_main-default`}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div>
          <span className="text text_type_main-default pr-2">
            Забыли пароль?
          </span>
          <Link
            to={'/forgot-password'}
            className={`${styles.link} ${styles.active} text text_type_main-default`}
          >
            Восстановить пароль
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
