import React, { Component, Fragment } from "react";
import PostList from "../components/Postlist/PostList";
import Head from "../components/head";
import axios from "../config/Axios/axios";
import Layout from "../pages/layout";
export class PostsList extends Component {
  static async getInitialProps() {
    const res = await axios.get("/category");
    const postsRes = await axios.get("/post");
    return { categories: res.data, posts: postsRes.data };
  }

  render() {
    return (
      <Layout>
        <Head
          title={"Wickedity | Posts"}
          metaTitle={"Wickedity | Posts"}
          url={typeof window !== "undefined" ? window.location.href : ""}
          metaKeywords={"blog technology science all categories posts"}
          metaDescription={"Blog about all the things I find intresting!!"}
          orgTitle={"Wickedity | Posts"}
          orgDescription={"Blog about all the things I find intresting!!"}
        />
        <PostList categories={this.props.categories} posts={this.props.posts} />
      </Layout>
    );
  }
}

export default PostsList;
