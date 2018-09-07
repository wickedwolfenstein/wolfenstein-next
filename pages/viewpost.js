import React from "react";
import axios from "../config/Axios/axios";
import Layout from "./layout";
import RelatedPosts from "../components/RelatedPosts/RelatedPosts";
import config from "../config/backendUrl";
import Head from "../components/head";
import NextHead from "next/head";
import Post from "../components/ViewPost/ViewPost";
export class ViewPost extends React.Component {
  static async getInitialProps({ query }) {
    const postsRes = await axios.get("/post/" + query.postId);
    return { post: postsRes.data };
  }

  render() {
    return (
      <Layout>
        <NextHead>
          <link
            rel="stylesheet"
            href="/static/assets/froala-editor/css/froala_style.min.css"
          />
        </NextHead>
        <Head
          title={this.props.post.title}
          metaTitle={this.props.post.title}
          metaKeywords={this.props.post.keywords}
          url={
            config.serverUrl + this.props.post.pageURL ||
            (typeof window !== "undefined" ? window.location.href : "")
          }
          metaDescription={this.props.post.card.description}
          orgTitle={this.props.post.title}
          orgDescription={this.props.post.card.description}
        />
        <Post post={this.props.post} />
        <RelatedPosts
          category={this.props.post.category}
          currPostID={this.props.post._id}
        />
      </Layout>
    );
  }
}

export default ViewPost;
