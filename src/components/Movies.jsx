import React, { Component } from "react";
import { getMovieList, deleteMovie } from "../services/moviesService.js";
import { getGenreList } from "../services/genreService.js";
import Pagination from "./common/pagination.jsx";
import { paginate } from "../utils/paginate.js";
import ListGroup from "./common/listGroup.jsx";
import MoviesTable from "./moviesTable.jsx";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchbox.jsx";
export class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const movies = await getMovieList();
    const genresList = await getGenreList();
    const genres = [{ _id: "", name: "All Genres" }, ...genresList];
    this.setState({ movies: movies, genres });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert(`this movie has already been deleted`);

        this.setState({ movies: originalMovies });
      }
    }
  };

  refreshAfterDelete = async () => {
    const movies = await getMovieList();

    this.setState({ movies });
  };

  HandlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      sortColumn,
      searchQuery,
      selectedGenre,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (this.state.movies.length === 0)
      return (
        <p className="container pt-5 fs-5">
          There are no movies in the database
        </p>
      );

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <React.Fragment>
        <p className="container mt-5 fs-5">
          There are {totalCount} movies in the database.
        </p>
        <div className="container d-flex justify-content-start align-items-center">
          <Link to="/movies/new" className="btn btn-primary mt-5 me-4">
            New Movie
          </Link>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />
        </div>

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
            onSort={this.handleSort}
          />
        </div>

        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.HandlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
