import React from "react";
import "./style2.css";
import "bootstrap/dist/css/bootstrap.min.css";
/* import FormDemo from './Forms/FormDemo';
import ReservationForm from './Forms/FormDemoMultiple'; */
import App2 from './Forms/App2'
import App3 from './liftingState/App3';
import StateDemo from './liftingUp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>

        <Header />
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/forms">
              <Forms />
            </Route>
            <Route path="/liftingState">
              <LiftingState />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Header() {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="selected" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/forms">Forms</NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/liftingState">Lifting State</NavLink>
      </li>
    </ul>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <StateDemo/>
    </div>
  );
}

function Forms() {
  return (
    <div>
      <App2/>
    </div>
  );
}

function LiftingState() {
  return (
    <div>
      <App3/>
    </div>
  );
}



