import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import { deleteMovie } from "../services/fakeMovieService.js";
import Like from "./common/like.jsx";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import { getGenres } from "../services/fakeGenreService.js";
export class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  HandlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
    } = this.state;

    if (this.state.movies.length === 0)
      return (
        <p className="container pt-5 fs-5">
          There are no movies in the database
        </p>
      );

    const filtered = selectedGenre
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="d-flex align-items-center justify-content-center container">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
          <table className="table container mt-5 ms-5">
            <thead>
              <p className="fs-5">
                Showing {filtered.length} movies in the database
              </p>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => {
                return (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        liked={movie.like}
                        onLike={() => this.handleLike(movie)}
                      />
                    </td>
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
                );
              })}
            </tbody>
          </table>
        </div>

        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.HandlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
