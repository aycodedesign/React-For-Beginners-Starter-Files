import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StorePicker from './StorePicker';
import App from './App';
import NotFound from "./NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      {/*when path exactly matches forward slash, import StorePicker component*/}
      <Route path="/store/:storeId" component={App} />
      {/*catch-all: any store ID will render App*/}
      <Route component={NotFound} />
      {/*catch-all: anything else renders Not Found component*/}
    </Switch>
  </BrowserRouter>
);

export default Router;