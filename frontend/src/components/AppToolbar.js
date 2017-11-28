import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {
  ASCENDING_ORDER,
  DESCENDING_ORDER 
} from '../actions/types'

const AppToolbar = ({ categories, filter, filterFunc, filterTitle, sort, changeOrderFunc, sortingTitle }) => {

  this.filterFunction = filterFunc;
  this.sort = sort;
  this.changeOrderFunc = changeOrderFunc;

  const onCategoryFilterChanged = (event, index, value) => {
    this.filterFunction(value);
  }

  const onSortOrderChanged = (event, index, value) => {
    const newSort = {
      field: this.sort.field,
      order: value
    };
    this.changeOrderFunc(newSort);
  }
  
  const onSortFieldChanged = (event, index, value) => {
    const newSort = {
      field: value,
      order: this.sort.order
    };
    this.changeOrderFunc(newSort);
  }

  return (
    <Toolbar>
      
      { categories !== undefined &&
      <ToolbarGroup >
        <ToolbarTitle text={filterTitle} />
        <DropDownMenu value={filter} onChange={onCategoryFilterChanged}>
          <MenuItem value="" primaryText="All" key="All" />
          { categories.map((category) =>
          <MenuItem value={category.name} primaryText={category.name} key={category.name} />
          )}
        </DropDownMenu>
      </ToolbarGroup>
      }

      <ToolbarGroup >
        <ToolbarTitle text={sortingTitle} />
        <DropDownMenu value={sort.field} onChange={onSortFieldChanged}>
          <MenuItem value="voteScore" primaryText="Votes" />
          <MenuItem value="timestamp" primaryText="Timestamp" />
        </DropDownMenu>

        <DropDownMenu value={sort.order} onChange={onSortOrderChanged}>
          <MenuItem value={ASCENDING_ORDER} primaryText="Ascending" />
          <MenuItem value={DESCENDING_ORDER} primaryText="Descending" />
        </DropDownMenu>
      </ToolbarGroup>      
    </Toolbar>
  );
}

AppToolbar.propTypes = {
  categories: PropTypes.array,
  filter: PropTypes.string,
  filterFunc: PropTypes.func,
  filterTitle: PropTypes.string,
  sort: PropTypes.object.isRequired,
  changeOrderFunc: PropTypes.func.isRequired,
  sortingTitle: PropTypes.string.isRequired
}

export default AppToolbar;



