import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./common/moviesTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenres: null,
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ _id: " ", name: "All Movies" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres,
    });
  }
  handleSort = (path) => {
    let sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn });
  };
  handleGenreSelected = (item) => {
    this.setState({ selectedGenres: item });
  };
  handleOnclick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  renderPage = () => {
    const {
      movies,
      selectedGenres,
      currentPage,
      pageSize,
      genres,
      sortColumn,
    } = this.state;
    const filtered =
      selectedGenres && selectedGenres._id
        ? movies.filter((m) => m.genre._id === selectedGenres._id)
        : movies;
    const sorted = _.orderBy(filtered, sortColumn.path, sortColumn.order);
    const pageMovies = paginate(filtered, currentPage, pageSize);
    const count = movies.length;
    if (count === 0)
      return <h2 className="m-5">There are no movies in Database</h2>;
    return (
      <>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              onItemSelect={this.handleGenreSelected}
              selectedGenres={selectedGenres}
            ></ListGroup>
          </div>
          <div className="col">
            <h2 className="m-5">
              Showing {filtered.length} movies in the database.
            </h2>
            <MoviesTable
              pageMovies={pageMovies}
              OnLike={this.handleOnclick}
              OnDelete={this.handleDelete}
              OnSort={this.handleSort}
            ></MoviesTable>
            <Pagination
              currentPage={currentPage}
              itemsCount={filtered.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            ></Pagination>
          </div>
        </div>
      </>
    );
  };

  render() {
    return <main className="container">{this.renderPage()}</main>;
  }
}

export default Movies;
