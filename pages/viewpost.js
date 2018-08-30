import React from "react";
import axios from "../config/Axios/axios";
import Layout from "./layout";
import Header from "../components/Header/Header";
import Head from "../components/head";
import Post from "../components/ViewPost/ViewPost";
export class ViewPost extends React.Component {
  static async getInitialProps({ query }) {
    const postsRes = await axios.get("/post/" + query.postId);
    return { post: postsRes.data };
  }

  render() {
    return (
      <Layout>
        <Head
          title={this.props.post.title}
          metaTitle={this.props.post.title}
          metaKeywords={this.props.post.keywords}
          url={typeof window !== "undefined" ? window.location.href : ""}
          metaDescription={this.props.post.card.description}
          orgTitle={this.props.post.title}
          orgDescription={this.props.post.card.description}
        />
        <Post post={this.props.post} />
      </Layout>
    );
  }
}

export default ViewPost;
