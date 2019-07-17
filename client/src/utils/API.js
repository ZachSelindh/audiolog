import axios from "axios";

export default {
  getAllPosts: function(token) {
    return axios.get("/api/posts/", {
      headers: { Authorization: "Bearer " + token }
    });
  },
  getPost: function(todoID, token) {
    return axios.get("/api/posts/" + todoID, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  getAuthoredPosts: function(userID, token) {
    return axios.get("/api/posts/author/" + userID, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  savePost: function(postData, token) {
    return axios.post("/api/posts", postData, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  updatePost: function(updatePostID, newPostData, token) {
    return axios.put("/api/posts/update/" + updatePostID, newPostData, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  deletePost: function(postDelete, token) {
    return axios.delete("/api/posts/post/delete/", {
      data: {
        id: postDelete.id,
        user: postDelete.user,
        headers: { Authorization: "Bearer " + token }
      }
    });
  },
  registerUser: function(newUserData) {
    return axios.post("/users/register-user", newUserData);
  },
  loginUser: function(userLoginData) {
    return axios.post("/users/login-user", userLoginData);
  },
  loginNewUser: function(newUserLoginData) {
    return axios.post("/users/login-new-user", newUserLoginData);
  },
  getUser: function(userID, token) {
    return axios.get("/users/get-user/" + userID, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  checkToken: function(token) {
    return axios.get("/check-token/", {
      headers: { Authorization: "Bearer " + token }
    });
  }
};
