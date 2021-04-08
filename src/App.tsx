import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import CountDown from './components/CountDown';
import CurrentTime from "./components/CurrentTime";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <CurrentTime />
        </Route>
        <Route path="/count-down">
          <CountDown />
        </Route>
      </Switch>
    </Router>
  );
}
