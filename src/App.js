import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';

import Articles from './components/articles/Articles';
import Filter from './components/articles/Filter';
import Errormsg from './components/layout/Errormsg';
import './App.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAllSelected, setIsAllSelected] = useState(true);

  let history = useHistory();

  // fetch articles from API
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://my.api.mockaroo.com/fed-exercise-data.json?key=cf334d90'
      );
      if (!response.ok) throw new Error('Failed to Fetch');

      const data = await response.json();
      setArticles(data);
      setFiltered(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // create filter tags from data of API
  const createTags = data => {
    let tags = [];
    // get array of Tags from each API data element
    data.forEach(el => {
      tags = tags.concat(el.Tags);
    });
    // uniqe and sorted tags
    const uniqueTagsArr = [...new Set(tags)].sort();

    // create a new tags object with each tag and set enabled feature
    const tagsIsEnabled = uniqueTagsArr.map(t => {
      return {
        text: t,
        enabled: !1,
      };
    });
    updateSelectedTags(tagsIsEnabled);

    setUniqueTags(tagsIsEnabled);
  };

  // Update tags from url param query
  const updateSelectedTags = (tags = uniqueTags) => {
    // get url param query and make it enabled
    let catQuery = getSeachQuery();

    if (catQuery) {
      setIsAllSelected(false);
      for (const el of catQuery) {
        tags.find(t => {
          if (t.text === el) {
            t.enabled = !t.enabled;
          }
        });
      }

      setUniqueTags(tags);
    }
  };

  // filter articles acording to clicked or checked category
  const filterArticles = filtered => {
    let newFiltered;
    const allFilters = [];

    for (const el of filtered) {
      newFiltered = articles.filter(tag => tag.Tags.includes(el));

      // Remove duplicates from new filtered array then add noDuplicates to array with all selected filters
      let noDuplicates = newFiltered.filter(
        found => !allFilters.find(elem => elem.id === found.id)
      );
      allFilters.push(...noDuplicates);
    }

    setFiltered(allFilters);
  };

  // Reset fileters or show All categories
  const clearFilters = () => {
    setFiltered(articles);
  };

  // get categories from url param query
  const getSeachQuery = function () {
    let catQuery;
    if (history.location.search) {
      let search = decodeURIComponent(
        history.location.search.replace('?cat=', '')
      );
      catQuery = (search || '').split(',');
      filterArticles(catQuery);
    }
    return catQuery;
  };

  useEffect(() => {
    getSeachQuery();
    createTags(articles);
  }, [articles]);

  const handleAllCatSelected = function (sel) {
    setIsAllSelected(sel);
  };

  if (error) {
    return (
      <div className="App">
        <Errormsg error={error} />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Filter
          tags={uniqueTags}
          isAllSelected={isAllSelected}
          handleAllCatSelected={handleAllCatSelected}
          filterArticles={filterArticles}
          clearFilters={clearFilters}
        />

        <div className="container">
          <Articles
            loading={loading}
            articles={filtered}
            filterArticles={filterArticles}
            getSeachQuery={getSeachQuery}
          />
        </div>
      </div>
    );
  }
};

export default App;
