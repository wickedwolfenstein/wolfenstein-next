import React, { Fragment } from "react";
import { Grid, Icon, Card, Segment } from "semantic-ui-react";
import ErrorProofImage from "../ErrorProofImage/ErrorProofImage";
import Link from "next/link";
import PropTypes from "prop-types";
import { randomColor } from "../Colors/Colors";
import OnVisible from "react-on-visible";

export const Postlist = props => {
  let categories = null;
  let posts = null;
  let postsDom = null;
  if (props.categories) {
    categories = props.categories.map(item => {
      return {
        key: item.key,
        text: item.text,
        value: item.value
      };
    });
  }
  if (props.posts) {
    const cardsCount = 3;
    let postlist = [...props.posts];
    let catagorizedPosts = [];
    let categoryArr = [];
    categories.forEach(element => {
      categoryArr = postlist.filter(x => x.category === element.value);
      if (categoryArr.length > 0) {
        catagorizedPosts.push({
          [element.text]: [...groupIntoChunks(categoryArr, cardsCount)]
        });
      }
    });
    posts = catagorizedPosts;

    if (posts) {
      postsDom = posts.map(item => {
        const categoryText = Object.keys(item)[0];
        return item[categoryText].map((chunks, index) => {
          return (
            <Fragment key={Math.random() * 500000}>
              {index === 0 ? (
                <Grid.Row columns={1} stretched>
                  <Grid.Column>
                    <OnVisible visibleClassName={"come-in-even"} percent={1}>
                      <Segment
                        textAlign="center"
                        raised
                        color={randomColor()}
                        size="large"
                        className={"come-in-even"}
                      >
                        <h3>{categoryText}</h3>
                      </Segment>
                    </OnVisible>
                  </Grid.Column>
                </Grid.Row>
              ) : null}
              <Grid.Row>
                {chunks.map((post, index) => {
                  let postUrl = null;
                  if (
                    post.title &&
                    post.category &&
                    post.category !== "" &&
                    post.title !== ""
                  ) {
                    const postName = post.title
                      .toLowerCase()
                      .replace(/[^a-z\s]/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/(^-+?)|(-+?$)/g, "");
                    postUrl =
                      "/posts/" +
                      post.category +
                      "/" +
                      post._id +
                      "/" +
                      postName;
                  }
                  return (
                    <Grid.Column
                      computer={5}
                      tablet={8}
                      mobile={16}
                      key={post._id}
                      style={{ margin: "auto" }}
                    >
                      <OnVisible
                        visibleClassName={
                          index % 2 === 0
                            ? "come-in-even clickable"
                            : "come-in-odd clickable"
                        }
                        percent={1}
                      >
                        <Link href={postUrl}>
                          <a className="anchor-clickable" />
                        </Link>
                        <Card centered>
                          <ErrorProofImage src={post.card.cardImage} />
                          <Card.Content>
                            <Card.Header>{post.card.headerText}</Card.Header>
                            <Card.Meta>
                              <span className={post.card.subheaderClass}>
                                {post.card.subheaderText}
                              </span>
                            </Card.Meta>
                            <Card.Description>
                              {post.card.description}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <a>
                              <Icon name={post.card.extraInfoIcon} />
                              {post.card.extraInfo}
                            </a>
                          </Card.Content>
                        </Card>
                      </OnVisible>
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            </Fragment>
          );
        });
      });
    }
  }
  return (
    <Grid className={"gridpushup takeFullHeight"}>
      <Grid.Row columns={3}>
        <Grid.Column tablet={2} computer={3} only="computer tablet" />
        <Grid.Column
          mobile={16}
          tablet={12}
          computer={10}
          className={"create-post-editor"}
        >
          <Grid className={"post-list"}>{postsDom}</Grid>
        </Grid.Column>
        <Grid.Column tablet={2} computer={3} only="computer tablet" />
      </Grid.Row>
    </Grid>
  );
};

const groupIntoChunks = (arr, chunkSize) => {
  var R = [];
  for (var i = 0; i < arr.length; i += chunkSize)
    R.push(arr.slice(i, i + chunkSize));
  return R;
};

export default Postlist;
