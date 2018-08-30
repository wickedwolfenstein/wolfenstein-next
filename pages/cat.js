import React from "react";
import axios from "../config/Axios/axios";
export default class extends React.Component {
  static async getInitialProps() {
    const res = await axios.get("/category");
    const postsRes = await axios.get("/post");
    return { categories: res.data, posts: postsRes.data };
  }

  render() {
    console.log(this.props);
    return <div>Hello World {this.props.nData}</div>;
  }
}
