import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import styles from "./modal-overlay.module.css";

export default function ModalOverlay({ children, close }) {

  return (
    <div
      className={[styles.popup, styles.opened].join(" ")}
      onClick={close}
    >
        {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
};
