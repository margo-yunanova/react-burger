import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WS_CONNECTION_START } from "../services/actions/webSocket";
import styles from "./feed.module.css";

const Feed = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(
    () => {
      dispatch({ type: WS_CONNECTION_START });
    },
    [dispatch]
  );

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={styles.table}>{children}</div>
    </section>
  );
};

export default Feed;
