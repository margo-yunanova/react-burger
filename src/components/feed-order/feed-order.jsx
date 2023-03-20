import PropTypes from "prop-types";
import styles from "./feed-order.module.css";

const FeedOrder = ({ children }) => {
  return (
    <div className={styles.section}>
      {children}
    </div>
  );
};

export default FeedOrder;

FeedOrder.propTypes = {
  children: PropTypes.node.isRequired,
};
