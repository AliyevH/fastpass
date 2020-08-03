import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './route/HomePage';
import Login from './route/AuthPages/Login';
import { useSelector, useDispatch } from 'react-redux';
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
