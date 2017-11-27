import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryList extends Component {
    render() {
        const MAX_CATEGORIES = 3;

        const catArray = this.props.categories || [];

        let cList = new Array(catArray.length + parseInt(catArray.length / MAX_CATEGORIES, 10)).fill(undefined).map((_, i) => {
            const index = i - parseInt((i + 1) / (MAX_CATEGORIES + 1), 10);
            const item = catArray[index];

            return (((i + 1) % (MAX_CATEGORIES + 1)) === 0) ?
                (<div key={i} className="cat-list"/>) :

                (<div className="item" key={i}>
                    <a key={item.name + item.path} href={`/${item.path}`}>
                        <div className="item-body">
                            <h4 className="item-title" >{item.name}</h4>
                        </div>
                    </a>
                </div>)
        });

        return (
            <div className="row">
                <div className="item-deck">
                    {cList}
                </div>
            </div>
        );
    }
}

CategoryList.propTypes = {
    categories: PropTypes.array.isRequired
};

export default CategoryList;