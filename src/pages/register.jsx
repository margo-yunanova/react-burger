import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register.module.css';


const RegisterPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.login}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
        <Input type={'text'} placeholder={'Имя'} />
        <EmailInput />
        <PasswordInput />
        <Button htmlType="button" type='primary' size='large'>Зарегистрироваться</Button>
      </div>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2" >Уже зарегистрированы?</span>
          <span>Войти</span>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
