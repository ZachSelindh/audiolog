import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import history from "../../utils/history";

class Header extends Component {
  componentWillMount = () => {
    if (localStorage.getItem("token")) {
      API.checkToken(localStorage.getItem("token"))
        .then(res => {
          if (res.data) {
            this.setState({ loggedIn: true });
          }
        })
        .catch(err => {
          if (err.response.status === 403) {
            this.setState({ loggedIn: false });
            history.push({
              pathname: "/login",
              state: { redirErr: "Your session has expired. Please log in" }
            });
          }
        });
    } else {
      console.log("No token found");
    }
  };

  logOutUser = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  render() {
    return (
      <div className="row todo-header">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <h1 id="header-title">AudioLog</h1>
            </div>
            <div className="col-sm-6 col-md-3">
              <p>A MERN-stack todo application</p>
            </div>
            <div className="col-sm-6 col-md-5">
              <div id="nav-header-z" className="row">
                <div className="nav-bar-z">
                  <a className="nav-link-z" href="/">
                    Home
                  </a>
                  <a className="nav-link-z" href="/completed">
                    Completed
                  </a>

                  <a
                    className="nav-link-z"
                    onClick={() => this.logOutUser()}
                    href="/login"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
