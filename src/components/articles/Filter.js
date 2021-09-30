import React from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const Filter = function ({
  tags,
  isAllSelected,
  handleAllCatSelected,
  filterArticles,
  clearFilters,
}) {
  const history = useHistory();

  let search = decodeURIComponent(history.location.search.replace('?cat=', ''));
  const allCat = (search && search.split(',')) || [];
  const tabs = document.querySelectorAll('.filters__tab');

  const updateQuery = q => {
    let query = q.innerText;
    if (allCat && allCat.includes(query)) {
      // remove selected filter all categories array
      allCat.splice(allCat.indexOf(query), 1);
      handleAllCatSelected(false);
    } else {
      // add selected filter to all categories array
      allCat.push(query);
    }

    q.parentNode.classList.toggle('filters__tab--active');

    let params = allCat.join(',');
    history.push({
      search: `?cat=${params}`,
      query: `${params}`,
    });
  };

  const handleClear = e => {
    // remove active class from all and set  all cat to active
    tabs.forEach(t => t.classList.remove('filters__tab--active'));
    handleAllCatSelected(true);

    clearFilters();

    allCat.length = 0;
    history.push({ pathname: '/', search: '', query: '' });
  };

  const handleFilter = e => {
    e.preventDefault();

    // remove active class from all
    handleAllCatSelected(false);

    updateQuery(e.target);

    if (allCat.length === 0) {
      handleClear();
    } else filterArticles(allCat);
  };

  return (
    <div className="container">
      <h3 className="filter-title">Filter</h3>
      <nav role="navigation">
        <ul>
          <li
            className={`filters__tab ${
              isAllSelected ? 'filters__tab--active' : ''
            }`}
          >
            <div onClick={handleClear}>All categories</div>
          </li>
          {tags &&
            tags.map((tag, i) => (
              <li
                key={i}
                className={`filters__tab ${
                  tag.enabled ? 'filters__tab--active' : ''
                }`}
              >
                <Link to="#" onClick={handleFilter}>
                  {tag.text}
                </Link>
              </li>
            ))}
          <li className="filters__tab">
            <div onClick={handleClear}>| Reset</div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

Filter.prototype = {
  tags: PropTypes.array.isRequired,
  filterArticles: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default withRouter(Filter);
