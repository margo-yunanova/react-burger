import styles from "./ingredient.module.css";
import PropTypes from "prop-types";

const Ingredient = ({ children, title }) => {
  return (
    <div className={styles.section}>
      <p className="text text_type_main-large">{title}</p>
      {children}
    </div>
  );
};

export default Ingredient;

Ingredient.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node,
}
