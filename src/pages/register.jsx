import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/actions/user';
import styles from './register.module.css';


const RegisterPage = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userEmail, userPassword, userName));
  }

  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input type={'text'} placeholder={'Имя'} value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <EmailInput value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
        <PasswordInput value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
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
