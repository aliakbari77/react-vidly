import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
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
          <button
            onClick={() => {
              this.handleDelete(m._id);
            }}
            className="btn btn-danger"
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

  render() {
    console.log(this.state.movies);
    if (this.state.movies.length == 0)
      return (
        <div className="container">
          <h2>There are no movie</h2>
        </div>
      );
    return (
      <div>
        <table className="table">
          <thead>{this.renderTableHeader()}</thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
