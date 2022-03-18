import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
  };

  handleDelete = (m_id) => {
    // ...
    console.log(m_id);
    this.state.movies = this.state.movies.filter((m) => m._id !== m_id);
    this.setState({ movies: this.state.movies });
  };

  renderTableData = () => {
    let list = this.state.movies.map((m) => {
      return (
        <tr key={m._id}>
          <td>{m.title}</td>
          <td>{m.genre.name}</td>
          <td>{m.numberInStock}</td>
          <td>{m.dailyRentalRate}</td>
          <Like movie={m} onHeart={this.handleHeart} />
          <button
            onClick={() => {
              this.handleDelete(m._id);
            }}
            className="btn btn-danger m-2"
          >
            Delete
          </button>
        </tr>
      );
    });
    return list;
  };

  renderTableHeader = () => {
    return (
      <tr>
        <th>Title</th>
        <th>Genre</th>
        <th>Stock</th>
        <th>Rate</th>
      </tr>
    );
  };

  handleHeart = (movie) => {
    const movies = this.state.movies;
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].enabled = movies[index].enabled == undefined ? true : false;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    console.log(page);
  };

  render() {
    console.log(this.state.movies);
    let count = this.state.movies.length;
    if (count == 0)
      return (
        <div className="container">
          <h2>There are no movie</h2>
        </div>
      );
    return (
      <div className="container">
        <table className="table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        <Pagination
          totalCount={count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Movies;
