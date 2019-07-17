import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";

class CreateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
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
        this.setState({ title: "", description: "" }),
        this.props.calltodb()
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>Enter your new Post:</h1>
        <form
          className="post-form"
          autoComplete="off"
          onSubmit={this.handleSubmit}
          method="POST"
        >
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateBar;
