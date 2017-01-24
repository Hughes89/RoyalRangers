import React from 'react';
import { Card, CardText } from 'material-ui';

import './Picture.css';

class Picture extends React.Component {
  render() {
    const { album } = this.props;
    return (
      <div className="Picture">
      <Card>
        <CardText>
          <p><strong>{album.title}</strong></p>
          <div className="album" dangerouslySetInnerHTML={{__html: album.code}} />
        </CardText>
      </Card>
      </div>
    );
  }
}

export default Picture;