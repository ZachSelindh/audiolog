import React, { Component } from "react";
import Header from "../Header";
import history from "../../utils/history";
import API from "../../utils/API";
import "./style.css";

class CreateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      error: "",
      submitted: false
    };
  }

  handleHome = event => {
    event.preventDefault();
    history.push("/");
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.title.length && this.state.description.length) {
      API.savePost(
        {
          title: this.state.title,
          description: this.state.description,
          author: localStorage.getItem("currentUser")
        },
        localStorage.getItem("token")
      )
        // Calls the function passed as props, which calls the database to re-load the pulled items.
        .then(
          res => console.log(res),
          this.setState({ title: "", description: "", submitted: true })
        )
        .catch(err => console.log(err));
    } else {
      this.setState({ error: "You must submit text in both fields" });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: "" });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="display-area-z col-8">
            {this.state.submitted ? (
              <div>
                <h1> Your Post has been submitted! </h1>
                <br />
                <br />
                <button className="submit-post-btn" onClick={this.handleHome}>
                  <h4>Take me to the Home Page</h4>
                </button>
              </div>
            ) : (
              <div>
                <br />
                <br />
                <h1>Enter your new Post:</h1>
                <br />
                <form
                  className="post-form"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                  method="POST"
                >
                  <div className="col-12">
                    <h3> Title: </h3>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <br />
                  <br />
                  <div className="col-12">
                    <h3>Description: </h3>
                    <textarea
                      className="form-control form-z"
                      placeholder="Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <br />
                  <br />
                  <h2 className="error-message">{this.state.error}</h2>
                  <br />
                  <br />
                  <button className="btn-lg btn-light" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBar;
