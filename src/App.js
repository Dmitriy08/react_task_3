import {} from "pages";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Link } from "react-router-dom";

import Planets from "pages/Planets";
import PlanetDetails from "pages/PlanetDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import InterestingFacts from "./components/InterestingFacts";
import NotificationProvider from "./components/Notification";
import Characters from "./pages/Characters";
import CharacterDetails from "pages/CharacterDetails";


const App = () => {
  return (
    <div className="container">
      <Router>
        <div>
          <Header />

          <InterestingFacts />
          <NotificationProvider>
            <Switch>
              <Route path="/(planets)?" exact>
                <ErrorBoundary>
                  <Planets />
                </ErrorBoundary>
              </Route>

              <Route path="/planet/:id">
                <ErrorBoundary>
                  <PlanetDetails />
                </ErrorBoundary>
              </Route>
              <Route path="/(characters)?" exact>
                <ErrorBoundary>
                  <Characters />
                </ErrorBoundary>
              </Route>
              <Route path="/character/:id">
                <ErrorBoundary>
                 <CharacterDetails/>
                </ErrorBoundary>
              </Route>
              <Route>
                <>
                  <p>Resource Not Found</p>
                  <p>
                    <Link to="/">go Home</Link>
                  </p>
                </>
              </Route>
            </Switch>
          </NotificationProvider>
        </div>
      </Router>
    </div>
  );
};

export default App;
