import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/actions/user';
import styles from './register.module.css';


const RegisterPage = () => {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  }

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input name='name' type={'text'} placeholder={'Имя'} value={form.name ?? ''} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
        <EmailInput name='email' value={form.email ?? ''} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
        <PasswordInput name='password' value={form.password ?? ''} onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}/>
        <Button htmlType="submit" type='primary' size='large'>Зарегистрироваться</Button>
      </form>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2" >Уже зарегистрированы?</span>
          <Link to={'/login'} className={`${styles.link} ${styles.active} text text_type_main-default`}>Войти</Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
