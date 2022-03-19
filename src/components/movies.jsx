import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

  handleDelete = (m_id) => {
    // ...
    console.log(m_id);
    this.state.movies = this.state.movies.filter((m) => m._id !== m_id);
    this.setState({ movies: this.state.movies });
  };

  renderTableData = (movies) => {
    let list = movies.map((m) => {
      return (
        <tr key={m._id}>
          <td>{m.title}</td>
          <td>{m.genre.name}</td>
          <td>{m.numberInStock}</td>
          <td>{m.dailyRentalRate}</td>
          <td>
            <Like movie={m} onHeart={this.handleHeart} />
          </td>
          <td>
            <button
              onClick={() => {
                this.handleDelete(m._id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
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
        <th>Like</th>
        <th>Action</th>
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
    this.setState({ currentPage: page });
  };

  render() {
    let count = this.state.movies.length;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);

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
          <tbody>{this.renderTableData(movies)}</tbody>
        </table>
        <Pagination
          itemsCount="abc"
          pageSize={pageSize}
          onPageChanges={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Movies;
