import {
  Button, EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUser } from "../services/actions/user";
import { restorePasswordRequest } from "../utils/burger-api";
import styles from "./forgot-password.module.css";

const ForgotPasswordPage = () => {
  const [form, setForm] = useState({});
  const [isRequestSent, setRequestSent] = useState(false);
  const successRequest = useSelector((state) => state.user.success);
  const request = useSelector((state) => state.user.request);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    setRequestSent(true)
  }, [dispatch]);

  if (!isRequestSent && request) {
    return null;
  }

  if (successRequest && !request) {
    return <Navigate to={'/'} />
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    restorePasswordRequest(form).then(({ success }) => {
      if (success) {
        navigate("/reset-password", { replace: true });
        localStorage.setItem("successResetPassword", success);
      }
      return null;
    });
  };



  return (
    <section className={styles.section}>
      <form className={styles.login} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          name="email"
          placeholder="Укажите e-mail"
          value={form.email ?? ""}
          onChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
        />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
        </Button>
      </form>
      <div className={styles.info}>
        <div>
          <span className="text text_type_main-default pr-2">
            Вспомнили пароль?
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

export default ForgotPasswordPage;
