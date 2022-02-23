import React, { Component } from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import PageComponentContainer from './PageComponentContainer';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {
            routes.map((route) => (
              <Route
                exact
                strict
                key={route.path}
                path={route.path}
                name={route.name}
                render={
                  ({ match }) => {
                    return (
                      <PageComponentContainer
                        component={route.component}
                        match={match}
                        name={route.name}
                        data={this.props.data}
                      />
                    );
                  }
                }
              />
            ))
          }
        </Switch>
      </Router>
    );
  }
}

loadableReady(() => {
  const root = document.getElementById('app');
  hydrate(<App />, root);
});
