import React from 'react';
import {
  StaticRouter,
  Route,
  Switch,
} from 'react-router-dom';
import routes from './routes';
import PageComponentContainer from './PageComponentContainer';

const serverRender = () => {
  return (context) => {
    const { url } = context;
    const initState = {};

    Object.entries(context).forEach((item) => {
      const key = item[0];
      initState[key] = item[1];
    });

    return (
      <StaticRouter location={url} context={{}}>
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
                        data={initState}
                      />
                    );
                  }
                }
              />
            ))
          }
        </Switch>
      </StaticRouter>
    );
  };
};

export default serverRender();
