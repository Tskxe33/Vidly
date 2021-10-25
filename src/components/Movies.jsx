import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import { deleteMovie } from "../services/fakeMovieService.js";

export class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  //   handleDelete = (movie) => {
  //     const movies = this.state.movies.filter((m) => m._id !== movie.id);
  //     this.setState({ movies });
  //   };

  render() {
    // eslint-disable-next-line no-restricted-globals
    if (this.state.movies.length === 0)
      return <p className="container">There are no movies in the database</p>;
    return (
      <React.Fragment>
        <table class="table container mt-5">
          <thead>
            <p>Showing {this.state.movies.length} movies in the database</p>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => {
              return (
                <>
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteMovie(movie._id);
                          this.setState({ movies: getMovies() });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
