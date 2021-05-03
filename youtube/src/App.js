import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Navbar from './component/Navbar';
import WatchLater from './component/WatchLater';
import Layout from './Layout';

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route path="/home" component={Layout} />
          <Route path="/watchlater" component={WatchLater} />
          <Redirect from="/" to="/home" />
        </Switch>
      </>
    );
  }
}

export default App;
