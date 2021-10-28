import React from "react";

import Movies from "./components/Movies";
import { Route, Redirect, Switch } from "react-router-dom";
import Costumers from "./components/costumers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/movies/:id " component={MovieForm} />
        <Route path="/movies" component={Movies} />
        <Route path="/costumers" component={Costumers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Redirect from="/" to="/movies" exact />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  );
}

export default App;
