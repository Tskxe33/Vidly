import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Costumers from "./components/costumers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Movies from "./components/Movies";
import MovieForm from "./components/movieForm";
import Navbar from "./components/common/navbar";
import LoginForm from "./components/loginForm";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id " component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/costumers" component={Costumers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/movies" exact />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
