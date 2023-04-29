import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import LoginFormPage from "./components/loginFormPage/index";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotView from "./components/Spots";
import CreateSpotPage from "./components/pages/CreateSpotPage";
import ImagesPage from "./components/pages/ImagesPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/create-spot'>
            <CreateSpotPage />
          </Route>

          <Route exact path='/'>
            <SpotView />
          </Route>

          <Route exact path='/photos'>
            <ImagesPage />
          </Route>

        </Switch>


      )}
      <Switch>

      </Switch>
    </>
  );
}

export default App;
