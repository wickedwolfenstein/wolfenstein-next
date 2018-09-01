import React from "react";
import axios from "../config/Axios/axios";
import { access } from "fs";
export default class extends React.Component {
  componentDidMount() {
    const pages = {
      "/": { page: "/index" },
      "/about": { page: "/about" },
      "/contact": { page: "/contact" },
      "/privacy": { page: "/privacy" },
      "/terms": { page: "/terms" },
      "/login": { page: "/login" },
      "/profile": { page: "/profile" },
      "/posts": { page: "/posts" },
      "/createpost": { page: "/createpost" }
    };
    axios
      .get("/post")
      // get all the posts and return those with slug
      .then(data => {
        console.log(data.data);
        let posts = data.data.reduce((acc, curr) => {
          let postid = curr._id;
          let Obj = Object.assign(acc, {
            [`${curr.pageURL}`]: {
              page: "/viewpost",
              query: { postId: postid }
            }
          });
          return Obj;
        }, {});
        let editPosts = data.data.reduce((acc, curr) => {
          let postid = curr._id;
          let Obj = Object.assign(acc, {
            [`/editpost/${postid}`]: {
              page: "/editpost",
              query: { postId: postid }
            }
          });
          return Obj;
        }, {});
        console.log({ ...pages, ...posts, ...editPosts });
      })
      .catch(console.error);
  }

  render() {
    return <div>Hello World {this.props.nData}</div>;
  }
}
