import React from 'react';

class News extends React.Component {
  render() {
    const { newsItem } = this.props;
    return (
      <div className="News">
        <a href={newsItem.link['#text']}>{newsItem.title['#text']}</a><br />
        <div className="News-Description" dangerouslySetInnerHTML={{__html: newsItem.description['#text']}} />
      </div>
    );
  }
}

export default News;