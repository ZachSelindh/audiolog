import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      photoURL: "",
      email: "",
      errors: [],
      registered: false,
      holdingPhotoURL: "",
      holdingUsername: "",
      holdingEmail: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    // Check if registration fields are empty
    if (
      this.state.username.length &&
      this.state.password.length &&
      this.state.photoURL.length &&
      this.state.email.length
    ) {
      API.registerUser({
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
        photoURL: this.state.photoURL,
        email: this.state.email
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              holdingUsername: this.state.username,
              holdingPhotoURL: this.state.photoURL,
              holdingEmail: this.state.email,
              registered: true
            });
            this.setState({
              username: "",
              password: "",
              password2: "",
              photoURL: "",
              email: "",
              errors: []
            });
            API.loginNewUser(res.data.newUser)
              .then(response => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                  "currentUser",
                  response.data.foundUser._id
                );
              })
              .catch(err =>
                console.log("Problem with login after register", err)
              );
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          console.log("HERE");
          var arrofErr = [...err.response.data.error.errors];
          this.setState({ errors: arrofErr });
        });
    } else {
      var currentErrors = this.state.errors;
      currentErrors.push({ param: "top", msg: "All fields must be filled in" });
      this.setState({ errors: currentErrors });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <div className="display-area-z register-page col-12">
          <div className="row">
            <div id="user-display" className=" col-sm-12 col-md-4">
              <img
                alt={
                  this.state.registered
                    ? this.state.holdingUsername
                    : this.state.username
                }
                src={
                  this.state.registered
                    ? this.state.holdingPhotoURL
                    : this.state.photoURL.length
                    ? this.state.photoURL
                    : "https://png.pngtree.com/svg/20161110/d3396c299f.svg"
                }
                height="200px"
                width="200px"
              />
              <h2>
                {this.state.registered
                  ? this.state.holdingUsername
                  : this.state.username}
              </h2>
              <h2>
                {this.state.registered
                  ? this.state.holdingEmail
                  : this.state.email}
              </h2>
            </div>
            <div className="col-sm-12 col-md-8">
              {this.state.registered ? (
                <div>
                  <h2 className="registered-alert">
                    User successfully registered!
                  </h2>
                  <br />
                  <br />
                  <a href="/">
                    <p>Take me to the Front Page</p>
                  </a>
                </div>
              ) : (
                <div>
                  <h1>User Registration</h1>
                  <form
                    className="todo-form"
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                  >
                    {this.state.errors.length
                      ? this.state.errors.map(error =>
                          error.param === "top" ? (
                            <p
                              className="error-message"
                              key={error.param + error.value}
                            >
                              {error.msg}
                            </p>
                          ) : null
                        )
                      : null}
                    <div className="form-item">
                      <p>Username: </p>
                      <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                      />
                      {this.state.errors.length
                        ? this.state.errors.map(error =>
                            error.param === "username" ? (
                              <p
                                className="error-message"
                                key={error.param + error.value}
                              >
                                {error.msg}
                              </p>
                            ) : null
                          )
                        : null}
                    </div>
                    <div className="form-item">
                      <p>Password: </p>
                      <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-item">
                      <p>Repeat Password: </p>
                      <input
                        type="password"
                        placeholder="Repeat Password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.handleInputChange}
                      />
                      {this.state.errors.length
                        ? this.state.errors.map(error =>
                            error.param === "password" ? (
                              <p
                                className="error-message"
                                key={error.param + error.value}
                              >
                                {error.msg}
                              </p>
                            ) : null
                          )
                        : null}
                    </div>
                    <div className="form-item">
                      <p>Profile Picture URL: </p>
                      <input
                        type="text"
                        placeholder="Photo URL"
                        name="photoURL"
                        value={this.state.photoURL}
                        onChange={this.handleInputChange}
                      />
                      {this.state.errors.length
                        ? this.state.errors.map(error =>
                            error.param === "photoURL" ? (
                              <p
                                className="error-message"
                                key={error.param + error.value}
                              >
                                {error.msg}
                              </p>
                            ) : null
                          )
                        : null}
                    </div>
                    <div className="form-item">
                      <p>Email Address: </p>
                      <input
                        type="text"
                        placeholder="Email Address"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                      />
                      {this.state.errors.length
                        ? this.state.errors.map(error =>
                            error.param === "email" ? (
                              <p
                                className="error-message"
                                key={error.param + error.value}
                              >
                                {error.msg}
                              </p>
                            ) : null
                          )
                        : null}
                    </div>
                    <br />
                    <br />
                    <button type="submit">Submit</button>
                    <br />
                    <br />
                    {this.state.registered ? null : (
                      <a href="/login">
                        <p>Take me to login</p>
                      </a>
                    )}
                  </form>
                  <p> All fields are case sensitive </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
