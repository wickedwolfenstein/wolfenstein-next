import React, { Component, Fragment } from "react";
import { Segment, Card, Divider, Icon } from "semantic-ui-react";
import Image from "../ErrorProofImage/ErrorProofImage";
import api from "../../config/Axios/axios";
import Router from "next/router";
import Link from "next/link";
export class RelatedPosts extends Component {
  state = {
    posts: ""
  };

  componentDidMount() {
    if (this.props.category && this.props.category !== "") {
      api
        .get("/post?cat=" + this.props.category)
        .then(res => {
          if (res.status === 404) {
            console.log("Posts Not Found");
          } else {
            let postsRes = res.data.filter(
              item => item._id !== this.props.currPostID
            );
            if (this.state.posts.length <= 0) {
              this.setState({ posts: [...postsRes] });
            }
          }
        })
        .catch(err => {
          //Router.pushRoute("/500");
          console.log(err);
        });
    }
  }

  render() {
    let relatedPostsDOM = null;
    if (this.state.posts && this.state.posts.length > 0) {
      relatedPostsDOM = this.state.posts.slice(0, 3).map(post => {
        return (
          <Card raised key={post._id} className={"clickable centerAlign"}>
            <Link href={post.pageURL ? post.pageURL : "/"}>
              <a className={"anchor-clickable"} />
            </Link>
            <Image src={post.card.cardImage} />
            <Card.Content>
              <Card.Header>{post.card.headerText}</Card.Header>
              <Card.Meta>
                <span className={post.card.subheaderClass}>
                  {post.card.subheaderText}
                </span>
              </Card.Meta>
              <Card.Description>{post.card.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name={post.card.extraInfoIcon} />
                {post.card.extraInfo}
              </a>
            </Card.Content>
          </Card>
        );
      });
    }
    return (
      <Fragment>
        {this.state.posts && this.state.posts.length > 0 ? (
          <Segment raised>
            <Divider horizontal>Related Posts</Divider>
            <br />
            <Card.Group itemsPerRow={3} stackable doubling>
              {relatedPostsDOM}
            </Card.Group>
          </Segment>
        ) : (
          undefined
        )}
      </Fragment>
    );
  }
}

export default RelatedPosts;
