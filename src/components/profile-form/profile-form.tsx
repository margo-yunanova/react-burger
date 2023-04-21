import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/actions/user';
import styles from './profile-form.module.css';

const ProfileForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const isLogout = useSelector((state) => state.user.isLogout);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successRequest = useSelector((state) => state.user.success);
  const name = useSelector((state) => state.user.user?.name);
  const email = useSelector((state) => state.user.user?.email);

  useEffect(() => {
    if (!successRequest) {
      dispatch(getUser());
    }
  }, [dispatch, successRequest]);

  useEffect(() => {
    if (successRequest) {
      setForm({ name, email });
    }
  }, [successRequest, name, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm({ name, email });
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
        type={'email'}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        value={form.email}
      />
      <PasswordInput
        type={'password'}
        name={'password'}
        placeholder={'Пароль'}
        icon="EditIcon"
        onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
        value={'*'.repeat(10)}
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
