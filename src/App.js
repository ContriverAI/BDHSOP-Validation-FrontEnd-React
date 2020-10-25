import React, { useCallback, useState, useContext } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Add from "./pages/add/Add";
import Create from "./pages/create/Create";
import View from "./pages/view/View";
import Home from "./pages/home/Home";
import Navigation from "./components/navigation/Navigation";
import { AuthContext } from "./context/AuthContext";
function App() {
  const auth = useContext(AuthContext);
  const [isLoggedIn, SetIsLoggedIn] = useState(auth.isLoggedIn);
  const [userIs, setUserIs] = useState(auth.userIs);
  console.log(isLoggedIn);
  const login = useCallback(() => {
    SetIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    SetIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* <Home /> */}
          <View />
        </Route>
        <Route path="/add/" exact>
          <Add />
        </Route>
        {/* <Route path="/view" exact>
          <View />
        </Route> */}
        <Route path="/create/" exact>
          <Create />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/add/" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/view/" exact>
          <Redirect to="/" />
        </Route>
        <Route path="/create/" exact>
          <Redirect to="/" />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        userIs: userIs,
        setUserIs: setUserIs,
      }}
    >
      <Router basename="/">
        <Navigation />
        {/* <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/add" exact>
          <Add />
        </Route>
        <Route path="/view" exact>
          <View />
        </Route>
        <Route path="/create" exact>
          <Create />
        </Route>
      </Switch> */}
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
