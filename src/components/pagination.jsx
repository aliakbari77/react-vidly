import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Pagination extends Component {
  state = {
    movies: getMovies(),
  };

  render() {
    console.log(this.state.movies);
    return (
      <React.Fragment>
        <div className="container">
          <nav>
            <ul className="pagination">
              <li className="page-item active">
                <a href="#" className="page-link">
                  1
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  2
                </a>
              </li>
              <li className="page-item">
                <a href="#" className="page-link">
                  3
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </React.Fragment>
    );
  }
}

export default Pagination;
