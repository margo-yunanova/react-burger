import {
  PasswordInput,
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { getUser, logoutUser, updateUser } from "../services/actions/user";
import styles from "./profile.module.css";

const Profile = () => {
  const activeLink = ({ isActive }) =>
    `${isActive ? styles.active : ""} + ${
      styles.link
    } + text text_type_main-medium`;

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const isLogout = useSelector((state) => state.user.isLogout);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const successRequest = useSelector((state) => state.user.success);
  const name = useSelector((state) => state.user.user?.name);
  const email = useSelector((state) => state.user.user?.email);

  const location = useLocation();

  useEffect(() => {
    if (!successRequest) {
      dispatch(getUser())
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

  const handleExit = (e) => {
    e.preventDefault();
    dispatch(logoutUser())
  }

  useEffect(() => {
    if (isLogout) {
      navigate('/login')
    }
  })

  return (
    <section className={styles.grid}>
      <div>
        <nav className={`${styles.menu} pb-10`}>
          <NavLink to="/profile" end className={activeLink}>
            Профиль
          </NavLink>
          <NavLink to="/profile/orders" end className={activeLink}>
            История заказов
          </NavLink>
          <Link className={`${styles.link} text text_type_main-medium`} onClick={handleExit}>
            Выход
          </Link>
        </nav>
        <span className={`${styles.info} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      {location.pathname === '/profile' ? (<form
        className={styles.login}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <Input
          type={"text"}
          name={"name"}
          placeholder="Имя"
          icon="EditIcon"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          value={form.name}
        />
        <EmailInput
          type={"email"}
          name={"email"}
          placeholder="Логин"
          isIcon={true}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          value={form.email}
        />
        <PasswordInput
          type={"password"}
          name={"password"}
          placeholder={"Пароль"}
          icon="EditIcon"
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          value={"*".repeat(10)}
        />
        <div className={styles.button}>
          <Button htmlType="reset" type="secondary" size="large">
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="large">
            Сохранить
          </Button>
        </div>
      </form>) : (<Outlet />)}
    </section>
  );
};

export default Profile;
