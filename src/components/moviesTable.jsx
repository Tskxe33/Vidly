import React from "react";
import { deleteMovie } from "../services/fakeMovieService.js";
import Like from "./common/like.jsx";
import TableBody from "./common/tableBody.jsx";

import TableHeader from "./common/tableHeader.jsx";

class MoviesTable extends React.Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.like} onLike={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => {
            deleteMovie(movie._id);
            this.props.refreshMovies();
          }}
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, filtered, onSort, sortColumn } = this.props;
    return (
      <React.Fragment>
        <table className="table container mt-5 ms-5">
          <TableHeader
            filtered={filtered}
            columns={this.columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody data={movies} columns={this.columns} />
        </table>
      </React.Fragment>
    );
  }
}

export default MoviesTable;
