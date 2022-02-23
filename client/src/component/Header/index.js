import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default () => {
  return (
    <div className="header">
      <Link to="/">Index</Link>
      <Link to="/about">About</Link>
    </div>
  );
};
