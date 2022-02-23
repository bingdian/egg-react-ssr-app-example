import React, { Component } from 'react';
import Header from '../../component/Header';
import './index.scss';

class About extends Component {
  render() {
    return (
      <div className="about">
        <Header />
        <h1>About Page</h1>
      </div>
    );
  }
}

export default About;
