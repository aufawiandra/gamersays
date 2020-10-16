import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './services/routes';

function App() {

  const pages = routes.map((route, int) => (
    <Route component={route.component} exact={route.exact} path={route.path} key={int} />
  ));

  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <Switch>
          {pages}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;