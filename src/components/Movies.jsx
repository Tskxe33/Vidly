import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";

import Pagination from "./common/pagination.jsx";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import { getGenres } from "../services/fakeGenreService.js";
import MoviesTable from "./moviesTable.jsx";
import _ from "lodash";
export class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  refreshAfterDelete = () => {
    this.setState({ movies: getMovies() });
  };

  HandlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    // const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      sortColumn,
      selectedGenre,
    } = this.state;

    if (this.state.movies.length === 0)
      return (
        <p className="container pt-5 fs-5">
          There are no movies in the database
        </p>
      );

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="d-flex align-items-center justify-content-center container">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
          <MoviesTable
            sortColumn={sortColumn}
            refreshMovies={this.refreshAfterDelete}
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            filtered={filtered}
            onSort={this.handleSort}
          />
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
