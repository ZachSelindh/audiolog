import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import ToDoItem from "../ToDoItem";
import history from "../../utils/history";

class Completed extends Component {
  constructor() {
    super();
    this.state = {
      completeTodos: []
    };
  }

  componentWillMount = () => {
    if (!localStorage.getItem("currentUser")) {
      history.push("/login");
    }
  };

  componentDidMount = () => {
    this.setState({ completeTodos: [] });
    API.getCompletedTodos(localStorage.getItem("token"))
      .then(res => this.setState({ completeTodos: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="display-area-z" className="col-8">
        <h1>Completed Todos:</h1>
        {this.state.completeTodos.length ? (
          this.state.completeTodos.map(Todo => {
            return (
              <ToDoItem
                key={Todo._id}
                title={Todo.title}
                author={Todo.author}
                description={Todo.description}
                completed={Todo.completed}
              />
            );
          })
        ) : (
          <h3>No Todos Completed Yet</h3>
        )}
      </div>
    );
  }
}

export default Completed;
