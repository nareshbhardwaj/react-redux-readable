import React from 'react';
import PropTypes from 'prop-types';

const onCategoryFilterChanged = (event) => {
  const newFilter = event.target.value;
  this.filterFunction(newFilter);
}

const CategoryList = ({ categories, filterFunc }) => {
  this.filterFunction = filterFunc;
  return (
    <select onChange={onCategoryFilterChanged} >
      <option value="">All</option>
      { categories.map((category) =>
        <option value={category.name} key={category.name}>
          {category.name}
        </option>
      )}
    </select>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  filterFunc: PropTypes.func.isRequired,
}

export default CategoryList;
