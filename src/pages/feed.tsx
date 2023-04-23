import { FC, PropsWithChildren, useEffect } from 'react';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../services/actions/webSocket';
import styles from './feed.module.css';
import { getOrdersWsUrl } from '../utils/burger-api';
import { useAppDispatch } from '../utils/types';

type TFeed = PropsWithChildren;

const Feed: FC<TFeed> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: { url: getOrdersWsUrl(true) },
    });
    return () => void dispatch({ type: WS_CONNECTION_STOP });
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={styles.table}>{children}</div>
    </section>
  );
};

export default Feed;
