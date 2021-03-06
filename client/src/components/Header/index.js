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
            history.push({
              pathname: "/login",
              state: { redirErr: "Your session has expired. Please log in" }
            });
          }
        });
    } else {
      history.push({
        pathname: "/login",
        state: { redirErr: "Your session has expired. Please log in" }
      });
      console.log("No token found");
    }
  };

  handleHome = event => {
    event.preventDefault();
    history.push("/");
  };

  handleProfile = event => {
    event.preventDefault();
    history.push(`/profile/${localStorage.getItem("currentUser")}`);
  };

  logOutUser = event => {
    event.preventDefault();
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    history.push("/login");
  };

  render() {
    return (
      <div className="row todo-header">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <h1>AudioLog</h1>
            </div>
            <div className="col-sm-6 col-md-4">
              <p> A platform for sharing sounds and music </p>
            </div>
            <div className="col-sm-6 col-md-5">
              <div id="nav-header-z" className="row">
                <div className="nav-bar-z">
                  <button className="nav-link-z" onClick={this.handleHome}>
                    Home
                  </button>
                  <button className="nav-link-z" onClick={this.handleProfile}>
                    Your Profile
                  </button>
                  <button className="nav-link-z" onClick={this.logOutUser}>
                    Logout
                  </button>
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
