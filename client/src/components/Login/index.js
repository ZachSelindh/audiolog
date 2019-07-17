import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import history from "../../utils/history";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: []
    };
  }

  componentWillMount = () => {
    API.checkToken(localStorage.getItem("token"))
      .then(res => {
        console.log(res.data.message);
        history.push("/");
      })
      .catch(err => {
        if (err.response.status === 403) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          history.push({
            pathname: "/login"
          });
        } else {
        }
      });
  };

  componentDidMount = () => {
    if (typeof this.props.location.state !== "undefined") {
      this.setState({
        errors: [{ nameError: this.props.location.state.redirErr }]
      });
    } else {
      console.log(this.props.location);
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    // Check if username or password fields are blank.
    if (this.state.username.length && this.state.password.length) {
      API.loginUser({
        username: this.state.username,
        password: this.state.password
      })
        // Logging JWT
        .then(response => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("currentUser", response.data.foundUser._id);
          this.setState({
            username: "",
            password: ""
          });
          history.push(response.data.redirectURL);
        })
        .catch(err => {
          console.log(err.response.data.errorMessage);
          this.setState({
            errors: [
              { nameError: "Username or password do not match our records" }
            ]
          });
        });
    } else {
      this.setState({
        errors: [{ nameError: "You must fill in both fields" }]
      });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <div id="display-area-z" className="col-8 login-page">
          <h1>User Login</h1>
          <p> Enter your username and password </p>
          <form
            className="todo-form"
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            {this.state.errors.length
              ? this.state.errors.map(error =>
                  error.nameError ? (
                    <p className="error-message" key={error.nameError}>
                      {error.nameError}
                    </p>
                  ) : null
                )
              : null}
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <br />
            <br />
            <button type="submit">Submit</button>
            <a href="/registration">
              <br />
              <br />
              <p>I don't have an account</p>
            </a>
          </form>
          <p> Password and username are case sensitive </p>
        </div>
      </div>
    );
  }
}

export default LoginPage;
