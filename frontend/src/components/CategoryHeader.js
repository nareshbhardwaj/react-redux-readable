import React from 'react';
import PropTypes from 'prop-types';
import CategoryList from './CategoryList';

const CategoryHeader = ({ categories, filterFunc }) => {
  return (
    <div>
      <h2>Categories</h2>
      <CategoryList 
        categories={categories} 
        filterFunc={filterFunc}
      />
    </div>
  );
};

CategoryHeader.propTypes = {
  categories: PropTypes.array.isRequired,
  filterFunc: PropTypes.func.isRequired
}

export default CategoryHeader;
