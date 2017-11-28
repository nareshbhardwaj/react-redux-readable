import React from 'react';
import PropTypes from 'prop-types';
import {
  ASCENDING_ORDER,
  DESCENDING_ORDER 
} from '../actions/types'

const onSortOrderChanged = (event) => {
  const newSort = {
    field: this.sort.field,
    order: event.target.value
  };
  this.changeOrderFunc(newSort);
}

const onSortFieldChanged = (event) => {
  const newSort = {
    field: event.target.value,
    order: this.sort.order
  };
  this.changeOrderFunc(newSort);
}

const SortingHeader = ({ title, sort, changeOrderFunc }) => {
  this.sort = sort;
  this.changeOrderFunc = changeOrderFunc;

  return (
    <div>
      <h2>{title}</h2>

      <select value={sort.field} onChange={onSortFieldChanged}>
        <option value="voteScore">Votes</option>
        <option value="timestamp">Timestamp</option>
      </select>

      &nbsp;

      <select value={sort.order} onChange={onSortOrderChanged}>
        <option value={ASCENDING_ORDER}>Ascending</option>
        <option value={DESCENDING_ORDER}>Descending</option>
      </select>
    </div>
  );
};

SortingHeader.propTypes = {
  title: PropTypes.string.isRequired,
  changeOrderFunc: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired
}

export default SortingHeader;
