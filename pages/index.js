import React, { Component, Fragment } from "react";
import Banner2 from "../components/Banner2/Banner2";
import Head from "../components/head";
import axios from "../config/Axios/axios";
import PostList from "../components/Postlist/PostList";
import { Layout } from "./layout";
export class HomePage extends Component {
  static async getInitialProps() {
    const res = await axios.get("/category");
    const postsRes = await axios.get("/post");
    return { categories: res.data, posts: postsRes.data };
  }

  render() {
    return (
      <Layout>
        <Head
          title={"Wickedity | Login"}
          metaTitle={"Wickedity | Login"}
          metaKeywords={"wickedity,login"}
          url={typeof window !== "undefined" ? window.location.href : ""}
          metaDescription={"Login to start posting on this site."}
          orgTitle={"Wickedity | Login"}
          orgDescription={"Login to start posting on this site."}
        />
        <Banner2
          className={"wolf"}
          altText={"Banner"}
          headerText1={"Meet Sno!"}
          headerText2={"Meet Rex!"}
          subheading1={"The Cutest Cat in town"}
          subheading2={"The Baddest Beast in town"}
        />
        <PostList categories={this.props.categories} posts={this.props.posts} />
      </Layout>
    );
  }
}

export default HomePage;
