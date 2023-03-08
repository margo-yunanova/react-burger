import {
  PasswordInput,
  Input,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUser, updateUser } from "../services/actions/user";
import styles from "./profile.module.css";

const Profile = () => {
  const activeLink = ({ isActive }) =>
    `${isActive ? styles.active : ""} + ${
      styles.link
    } + text text_type_main-medium`;
  const accessToken = localStorage.getItem("accessToken");

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const dispatch = useDispatch();
  useEffect(() => dispatch(getUser(accessToken)), [dispatch, accessToken]);

  const successRequest = useSelector((state) => state.user.success);
  const name = useSelector((state) => state.user.user?.name);
  const email = useSelector((state) => state.user.user?.email);

  useEffect(() => {
    if (successRequest) {
      setForm({ name, email });
    }
  }, [successRequest, name, email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(form, accessToken));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm({ name, email });
  };

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
          <NavLink to="/profile/orders:id" end className={activeLink}>
            Выход
          </NavLink>
        </nav>
        <span className={`${styles.info} text text_type_main-default`}>
          В этом разделе вы можете изменить свои персональные данные
        </span>
      </div>
      <form
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
      </form>
    </section>
  );
};

export default Profile;
