import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    let count = this.state.movies.length;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    if (count == 0)
      return (
        <div className="container">
          <h2>There are no movie</h2>
        </div>
      );

    return (
      <div className="container p-3">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col-9">
            <h4>Showing {filtered.length} movies in the databases.</h4>
            <table className="table">
              <thead>{this.renderTableHeader()}</thead>
              <tbody>{this.renderTableData(movies)}</tbody>
            </table>
            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              onPageChanges={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
