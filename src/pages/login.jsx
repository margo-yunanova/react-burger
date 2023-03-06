import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authorizeUser } from '../services/actions/user';
import styles from './login.module.css';

const Login = () => {
  const [form, setForm] = useState({})
  const dispatch = useDispatch();
  const success = useSelector(state => state.user.success);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authorizeUser(form))
  }

  if (success) {
    navigate('/', {replace: true});
  };

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput name='email' value={form.email ?? ''} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
        <PasswordInput name='password' value={form.password ?? ''} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
        <Button htmlType="submit" type='primary' size='large' width={128}>Войти</Button>
      </form>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2" >Вы — новый пользователь?</span>
          <Link to={'/register'} className={`${styles.link} ${styles.active} text text_type_main-default`}>Зарегистрироваться</Link>
        </div>
        <div>
          <span className="text text_type_main-default pr-2">Забыли пароль?</span>
          <Link to={'/forgot-password'} className={`${styles.link} ${styles.active} text text_type_main-default`}>Восстановить пароль</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
