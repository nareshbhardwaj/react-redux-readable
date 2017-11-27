import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SortComponent extends Component {
    render() {
        const {sortContent} = this.props;

        return (
            <div>
                <h6>Sort by:</h6>
                <a href="#score" className="badge badge-primary mr-2"
                   onClick={
                       () => {
                           sortContent('score');
                           return false
                       }
                   }>{'score |'}</a>
                <a href="#newest" className="badge badge-primary"
                   onClick={
                       () => {
                           sortContent('newest');
                           return false
                       }
                   }>{' newest'}</a>
            </div>
        );
    }
}

SortComponent.propTypes = {
    sortContent: PropTypes.func.isRequired
};

export default SortComponent;