import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEventHandler, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/actions/user';
import styles from './profile-form.module.css';

const ProfileForm: FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '', //TODO проверить как работает редактирование пароля
    password: '', //
  });

  const isLogout = useSelector((state:any) => state.user.isLogout);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successRequest = useSelector((state:any) => state.user.success);
  const name = useSelector((state:any) => state.user.user?.name);
  const email = useSelector((state:any) => state.user.user?.email);

  useEffect(() => {
    if (!successRequest) {
      dispatch(getUser() as any);
    }
  }, [dispatch, successRequest]);

  useEffect(() => {
    if (successRequest) {
      setForm({ name, email, password: '', });
    }
  }, [successRequest, name, email]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(form) as any);
  };

  const handleReset: FormEventHandler = (e) => {
    e.preventDefault();
    setForm({ name, email, password: '' });
  };

  useEffect(() => {
    if (isLogout) {
      navigate('/login');
    }
  });

  return (
    <form
      className={styles.login}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Input
        type={'text'}
        name={'name'}
        placeholder="Имя"
        icon="EditIcon"
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        value={form.name}
      />
      <EmailInput
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        value={form.email}
      />
      <PasswordInput
        name={'password'}
        placeholder={'Пароль'}
        icon="EditIcon"
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        value={form.password}
      />
      <div className={styles.button}>
        <Button htmlType="reset" type="secondary" size="large">
          Отмена
        </Button>
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
