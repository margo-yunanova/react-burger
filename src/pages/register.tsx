import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { registerUser } from '../services/actions/user';
import styles from './register.module.css';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', });
  const success = useSelector((state: any) => state.user.success);
  const accessToken = localStorage.getItem('accessToken');

  const dispatch = useDispatch();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(form) as any);
  };

  if (success || accessToken) {
    return <Navigate to={'/'} />;
  }

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input
          name="name"
          type={'text'}
          placeholder={'Имя'}
          value={form.name ?? ''}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
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
        <Button htmlType="submit" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2">
            Уже зарегистрированы?
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

export default RegisterPage;
