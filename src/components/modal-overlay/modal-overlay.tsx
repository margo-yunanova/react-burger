import { FC } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
  children: React.ReactNode;
  close: () => void;
}

const ModalOverlay: FC<TModalOverlay> = ({ children, close }) => {
  return (
    <div className={[styles.popup, styles.opened].join(' ')} onClick={close}>
      {children}
    </div>
  );
}

export default ModalOverlay;
