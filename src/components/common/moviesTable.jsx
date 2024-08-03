import React, { Component } from "react";
import Like from "./like";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <Like
          onClick={() => this.props.OnLike(movie)}
          liked={movie.liked}
        ></Like>
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => this.props.OnDelete(movie)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { pageMovies, OnLike, OnDelete, OnSort, sortColumn } = this.props;
    return (
      <>
        <table className="table">
          <TableHeader
            OnSort={OnSort}
            columns={this.columns}
            sortColumn={sortColumn}
          ></TableHeader>
          <TableBody data={pageMovies} columns={this.columns}></TableBody>
        </table>
      </>
    );
  }
}

export default MoviesTable;
