import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class PageComponentContainer extends Component {
  render() {
    const { data, match, component, history } = this.props;
    const Page = component;

    return (
      <React.Fragment>
        <Page data={data} match={match} history={history} />
      </React.Fragment>
    );
  }
}

export default withRouter(PageComponentContainer);
