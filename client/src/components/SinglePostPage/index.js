import React, { Component } from "react";
import Header from "../Header";
import API from "../../utils/API";
import history from "../../utils/history";
import "./style.css";

class SinglePostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }

  componentWillMount = () => {
    API.checkToken(localStorage.getItem("token"))
      .then(res => {
        console.log(res.data.message);
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

  componentDidMount = () => {
    console.log(this.props.location.pathname.replace("/post/", ""));
    API.getPost(
      this.props.location.pathname.replace("/post/", ""),
      localStorage.getItem("token")
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Header />

        <div className="container todo-item">
          <div className="display-area-z col-8">
            <div className="row">
              <div className="col-12">
                <h1>Post title</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SinglePostPage;
