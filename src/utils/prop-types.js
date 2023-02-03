import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
});

export const orderType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  order: PropTypes.shape({
    number: PropTypes.number.isRequired,
  }),
  success: PropTypes.bool,
});
