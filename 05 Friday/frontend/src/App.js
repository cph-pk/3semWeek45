import React, { useState } from "react";
import "./style2.css"
import AllJokes from './AllJokes';
import AllScrape from './AllScrape';
import {
  Switch,
  Route,
  Link,
  NavLink,
  useHistory
} from "react-router-dom";


const Header = ({ isLoggedIn, loginMsg }) => {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="selected" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/jokes">Jokes</NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink activeClassName="selected" to="/scrape">Scrape</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink activeClassName="selected" to="/login-out">{loginMsg}</NavLink>
      </li>
    </ul>
  );
}

function Login({isLoggedIn, loginMsg, setLoginStatus}) {
  const handleBtnClick = () => {
    setLoginStatus(!isLoggedIn);
  };
  return (
    <div>
      <h2>{loginMsg}</h2>
      <button onClick={handleBtnClick}>{loginMsg}</button>
    </div>
  );

}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  }
  return (
   
      <div>
        <Header 
          loginMsg={isLoggedIn ? "Logout" : "Login"}
          isLoggedIn={isLoggedIn}
        />

        <div className="content">

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/jokes">
              <Jokes />
            </Route>
            <Route path="/scrape">
              <Scrape />
            </Route>
            <Route path="/login-out">
              <Login
                loginMsg={isLoggedIn ? "Logout" : "Login"}
                isLoggedIn={isLoggedIn}
                setLoginStatus={setLoginStatus}
              />
            </Route>
          </Switch>
        </div>
      </div>
   
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Jokes() {
  return (
    <div>
      <h2>Jokes</h2>
      <AllJokes />
    </div>
  );
}

function Scrape() {
  return (
    <div>
      <h2>Scrape</h2>
      <AllScrape />
    </div>
  );
}


