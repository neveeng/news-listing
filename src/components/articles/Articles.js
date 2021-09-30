import React from 'react';
import { PropTypes } from 'prop-types';

import ArticleItem from './ArticleItem';
import Spinner from '../layout/Spinner';

const Articles = function ({ articles, loading }) {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="articles">
        {articles.map(news => (
          <ArticleItem key={news.id} news={news} />
        ))}
      </div>
    );
  }
};

Articles.prototype = {
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Articles;
