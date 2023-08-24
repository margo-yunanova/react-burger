import { FC, PropsWithChildren } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = PropsWithChildren<{
  close: () => void;
}>;

const ModalOverlay: FC<TModalOverlay> = ({ children, close }) => {
  return (
    <div className={[styles.popup, styles.opened].join(' ')} onClick={close}>
      {children}
    </div>
  );
};

export default ModalOverlay;
