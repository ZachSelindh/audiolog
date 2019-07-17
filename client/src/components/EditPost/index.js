import React, { Component } from "react";
import Header from "../Header";
import API from "../../utils/API";
import history from "../../utils/history";
import "./style.css";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      description: "",
      updated: false
    };
    this.componentDidMount.bind(this);
  }

  componentWillMount = () => {
    API.checkToken(localStorage.getItem("token")).catch(err => {
      if (err.response.status === 403) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        history.push("/login");
      } else {
        console.log(err);
      }
    });
  };

  componentDidMount = () => {
    this.setState({
      id: this.props.location.state.props.postID,
      title: this.props.location.state.props.title,
      description: this.props.location.state.props.description
    });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, updated: false });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    event.preventDefault();
    API.updatePost(
      this.state.id,
      {
        title: this.state.title,
        description: this.state.description,
        user: localStorage.getItem("currentUser")
      },
      localStorage.getItem("token")
    )
      .then(res => {
        console.log(res.data);
        this.setState({ updated: true });
      })
      .catch(err => {
        if (err.response.status === 403) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          history.push({
            pathname: "/login",
            state: { redirErr: "Your session has expired. Please log in" }
          });
        } else {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div id="display-area-z" className="col-8 edit-page">
            <div>
              <h1>Edit your Post:</h1>
              {this.state.updated ? <p>Post successfully updated!</p> : null}
              <form
                className="post-form"
                autoComplete="off"
                onSubmit={this.handleSubmit}
                method="PUT"
              >
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                />
                <input
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
            {this.state.updated ? (
              <a href="/">
                <p>Take me Home</p>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default EditPost;
