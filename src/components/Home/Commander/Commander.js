import React from 'react';

import './Commander.css';

const Commander = ({name, title, email, picture, about}) => (
  <div className="commander">
    <strong>{name}</strong><br/>
    {title}<br/>
    <img className="commander-pic" src={picture} /><br />
    <small>{about}</small><br />
    <small><a href={email}>{email}</a></small>
  </div>
)

export default Commander;