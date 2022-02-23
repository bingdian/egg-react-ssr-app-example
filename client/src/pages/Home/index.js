import React, { Component } from 'react';
import Header from '../../component/Header';
import './index.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        <h1>Index Page</h1>
      </div>
    );
  }
}

export default Home;
