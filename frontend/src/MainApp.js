import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import App from "./containers/App";

function MainApp() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default MainApp;
