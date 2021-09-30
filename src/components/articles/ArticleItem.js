import React from 'react';

import { PropTypes } from 'prop-types';

const ArticleItem = function (props) {
  const {
    URL,
    ThumbnailImage,
    Subject,
    ArticleTitle,
    Date,
    Author,
    ShortDescription,
  } = props.news;

  return (
    <a href={URL} target="_blank" rel="noreferrer" className="card text-left">
      <img alt={ArticleTitle} src={ThumbnailImage} className="card__image" />
      <div className="card__details">
        <p className="card__details-subject">{Subject}</p>
        <div>
          <h2 className="card__details-title">{ArticleTitle}</h2>
          <p className="card__details-desc">{ShortDescription}</p>
        </div>
        <div className="card__details-author-date">
          <p
            style={{
              fontWeight: 600,
            }}
          >
            {Date}
          </p>
          <p>{Author}</p>
        </div>
      </div>
    </a>
  );
};

ArticleItem.prototype = {
  news: PropTypes.object.isRequired,
};

export default ArticleItem;
