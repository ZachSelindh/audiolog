import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.username.length && this.state.password.length) {
      API.loginUser({
        username: this.state.username,
        password: this.state.password
      })
        .then(foundUser => console.log(foundUser))
        .catch(err => console.log(err));
    } else {
      console.log("No");
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="login-page">
        <h1>User Login</h1>
        <p> Enter your username and password </p>
        <form className="todo-form" onSubmit={this.handleSubmit}>
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
            type="text"
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
    );
  }
}

export default LoginPage;