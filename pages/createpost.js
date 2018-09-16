import React, { Component, Fragment } from "react";
import Layout from "./layout";
let Store = null;
import { initUserStore } from "../Store/userStore";
import {
  Button,
  Divider,
  Grid,
  Modal,
  Form,
  Header,
  Message,
  Dropdown,
  Checkbox,
  Card,
  Image,
  Icon,
  Dimmer,
  Loader
} from "semantic-ui-react";
import api from "../config/Axios/axios";
import NextHead from "next/head";
import dynamic from "next/dynamic";
import $ from "jquery";
import "froala-editor/js/froala_editor.pkgd.min.js";
import Router from "next/router";
let FroalaEditor = dynamic(import("react-froala-wysiwyg"));

import { withRouter } from "next/router";
export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.submitButton = React.createRef();
    this.date = new Date();
  }
  state = {
    content: "",
    open: false,
    title: "Post title",
    category: "",
    cardDesc: "",
    cardImageUrl: "",
    heroImageUrl: "",
    error: false,
    warning: false,
    success: false,
    messageHeader: "Message Placeholder Text",
    messageDesc: "Message Placeholder Text",
    savingPost: false,
    postId: "",
    categories: [],
    copyCardImageToHero: false,
    dropDownErr: false,
    modalImgErr: false,
    savePostErr: false
  };

  componentDidMount() {
    Router.prefetch("/login");
    Store = initUserStore();
    if (!Store.isAuth) {
      //Router.pushRoute("/");
      Router.push("/login/createpost");
    }
    api.get("/category").then(res => {
      if (res.data) {
        const categories = res.data.map(item => {
          return {
            key: item.key,
            text: item.text,
            value: item.value
          };
        });
        console.log(this.props.router.pathname);
        if (this.props.router.pathname) {
          const urlParts = this.props.router.pathname.split("/").filter(x => x);
          if (
            urlParts[0] === "profile" &&
            urlParts[1] === "posts" &&
            urlParts[2]
          ) {
            api
              .get("/post/" + urlParts[2])
              .then(res => {
                this.setState({
                  savingPost: false,
                  title: res.data.title,
                  category: res.data.category,
                  headerText: res.data.card.headerText,
                  cardDesc: res.data.card.description,
                  cardImageUrl: res.data.card.cardImage,
                  heroImageUrl: res.data.heroImage,
                  open: false,
                  content: res.data.content,
                  postId: res.data._id,
                  categories
                });
              })
              .catch(err => {
                this.props.history.push("/404");
              });
          } else {
            this.setState({
              categories,
              open: true
            });
          }
        }
      }
    });
  }

  imgError = () => {
    this.setState({
      modalImgErr: true
    });
  };

  handleAddition = (e, { value }) => {
    let categories = this.state.categories;
    if (/^[a-zA-Z,&\s]+?$/g.test(value)) {
      const newCategory =
        value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
      categories.push({
        text: value.charAt(0).toUpperCase() + value.substr(1).toLowerCase(),
        value: value.toLowerCase(),
        key: value.toLowerCase()
      });
      api
        .post("/category", {
          text: newCategory
        })
        .then(() => {
          this.setState({
            categories,
            category: value.toLowerCase(),
            dropDownErr: false
          });
        })
        .catch(err => {
          console.log("Couldn't Save Category to database.");
        });
    } else {
      this.setState({
        dropDownErr: true
      });
    }
  };

  handleChange = (e, { value }) => this.setState({ category: value });

  handleModelChange = content => {
    this.setState({
      content: content
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      savingPost: true
    });
    const data = new FormData(e.target);
    const email = data.get("cardDesc");
    const pwd = data.get("cardImageUrl");
    if (data) {
      const title = data.get("title");
      const selectValue = this.state.category;
      const cardDesc = data.get("cardDesc");
      const cardImageUrl = data.get("cardImageUrl");
      const heroImageUrl = data.get("heroImageUrl");
      const keywords = data.get("keywords");
      if (
        title &&
        title !== "" &&
        (selectValue && selectValue !== "") &&
        ((heroImageUrl && heroImageUrl !== "") ||
          this.state.copyCardImageToHero) &&
        (cardDesc && cardDesc !== "") &&
        (cardImageUrl && cardImageUrl !== "") &&
        (keywords && keywords !== "")
      ) {
        const payload = {
          title: title,
          category: selectValue,
          content: "<hr><p>Edit Text Here</p>",
          author: Store.user.name,
          authorProfileID: Store.user.id,
          heroImage:
            heroImageUrl && !this.state.copyCardImageToHero
              ? heroImageUrl
              : cardImageUrl,
          keywords: keywords,
          card: {
            headerText: title,
            cardImage: cardImageUrl,
            subheaderText: Store.user.name,
            subheaderClass: "date",
            description: cardDesc,
            extraInfo: this.date.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "2-digit"
            }),
            extraInfoIcon: "calendar outline"
          }
        };
        api
          .post("/post", payload)
          .then(res => {
            if (res.status === 200) {
              const postUrl =
                "/posts/" +
                res.data.category +
                "/" +
                res.data._id +
                "/" +
                res.data.title
                  .toLowerCase()
                  .replace(/[^a-z\s]/g, "")
                  .replace(/\s+/g, "-")
                  .replace(/(^-+?)|(-+?$)/g, "");
              const postID = res.data._id;
              api
                .patch("/post/" + postID, { pageURL: postUrl })
                .then(res => {
                  this.setState({
                    savingPost: false,
                    title: title,
                    category: selectValue,
                    cardDesc: cardDesc,
                    cardImageUrl: cardImageUrl,
                    open: false,
                    content: "<hr><p>Edit Text Here</p>",
                    postId: postID
                  });
                })
                .catch(err => {
                  if (err.response.status === 401) {
                    this.props.history.push("/login");
                  }
                  console.error(
                    "There was an Error while trying to Save the Post.\n"
                  );
                  console.error(err);
                });
            }
          })
          .catch(err => {
            if (err.response.status === 401) {
              this.props.history.push("/login");
            }
            console.error(
              "There was an Error while trying to Save the Post.\n"
            );
            console.error(err);
          });
      } else if (selectValue === "") {
        this.setState({
          error: true,
          messageHeader: "Please fill in all the fields.",
          messageDesc: "Please select a value for Category"
        });
      }
    }
  };

  dropDownChanged = (e, { value }) => {
    this.setState({
      category: value
    });
  };

  inputHandler = (e, field) => {
    if (field !== "cardImageUrl") {
      this.setState({
        [field]: e.target.value
      });
    } else {
      this.setState({
        modalImgErr: false,
        [field]: e.target.value
      });
    }
  };

  okayButtonHandler = () => {
    this.submitButton.current.click();
  };

  cancelButtonHandler = () => {
    this.props.router.push("/");
  };

  checkboxHandler = () => {
    this.setState({
      copyCardImageToHero: !this.state.copyCardImageToHero
    });
  };

  savePostHandler = () => {
    this.setState({
      savingPost: true
    });
    const payload = {
      content: this.state.content
    };
    if (this.state.postId && this.state.postId !== "") {
      api
        .patch("/post/" + this.state.postId, payload)
        .then(() => {
          this.setState({
            savingPost: false
          });
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.setState({
              savePostErr: true
            });
          }
        });
    }
  };

  render() {
    let cate = null;
    if (this.state.category && this.state.category !== "") {
      let catObj = this.state.categories.filter(item => {
        return item.value === this.state.category;
      });
      if (catObj[0]) {
        cate = catObj[0].text;
      }
    }
    return (
      <Layout>
        <NextHead>
          <link
            rel="stylesheet"
            href="/static/assets/font-awesome/css/font-awesome.css"
          />
          <link
            rel="stylesheet"
            href="/static/assets/froala-editor/css/froala_style.min.css"
          />
          <link
            rel="stylesheet"
            href="/static/assets/froala-editor/css/froala_editor.pkgd.min.css"
          />
        </NextHead>
        {Store && Store.isAuth ? (
          <Fragment>
            <Modal
              open={this.state.savePostErr}
              closeOnEscape={false}
              closeOnDimmerClick={false}
              basic
              size="small"
            >
              <Header icon="x" content="No no no!" />
              <Modal.Content>
                <h2>Users can only edit their posts.</h2>
              </Modal.Content>
            </Modal>
            <Modal
              open={this.state.open}
              closeOnEscape={false}
              closeOnDimmerClick={false}
              onClose={this.close}
            >
              <Modal.Header>Enter Post Details</Modal.Header>
              <Modal.Content>
                <Form
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                  error={this.state.error}
                  warning={this.state.warning}
                  success={this.state.success}
                >
                  <Message
                    warning={this.state.warning}
                    success={this.state.success}
                    error={
                      !this.state.warning && !this.state.success ? true : false
                    }
                    header={this.state.messageHeader}
                    content={this.state.messageDesc}
                  />
                  <Header size="small" style={{ marginTop: "0" }}>
                    Post Details
                  </Header>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      label="Post Title"
                      name="title"
                      placeholder="Title"
                      required
                      onChange={event => {
                        this.inputHandler(event, "title");
                      }}
                    />
                    <Form.Field>
                      <label>Category</label>
                      <Dropdown
                        options={this.state.categories}
                        placeholder="Category"
                        search
                        error={this.state.dropDownErr}
                        selection
                        fluid
                        allowAdditions
                        value={this.state.category}
                        onAddItem={this.handleAddition}
                        onChange={this.dropDownChanged}
                      />
                    </Form.Field>
                    {/* <Form.Field
                  control={Select}
                  fluid
                  label="Post Category"
                  name="category"
                  options={this.state.categories}
                  placeholder="Category"
                  onChange={this.dropDownChanged}
                  required
                /> */}
                  </Form.Group>
                  <Grid columns={2} divided>
                    <Grid.Row stretched>
                      <Grid.Column>
                        <Form.Input
                          fluid
                          name="cardDesc"
                          label="Description"
                          placeholder="Description Text"
                          required
                          onChange={event => {
                            this.inputHandler(event, "cardDesc");
                          }}
                        />
                        <Form.Input
                          fluid
                          name="cardImageUrl"
                          label="Card Image Url"
                          placeholder="URL"
                          required
                          onChange={event => {
                            this.inputHandler(event, "cardImageUrl");
                          }}
                        />
                        <Form.Input
                          fluid
                          name="heroImageUrl"
                          label="Hero Image Url"
                          placeholder="Hero Image Url"
                          required
                          disabled={this.state.copyCardImageToHero}
                          onChange={event => {
                            this.inputHandler(event, "heroImageUrl");
                          }}
                          value={
                            this.state.copyCardImageToHero
                              ? this.state.cardImageUrl
                              : this.state.heroImageUrl
                          }
                        />
                        <Form.Field
                          control={Checkbox}
                          label={<label>Same as Card Image</label>}
                          onChange={e => {
                            this.checkboxHandler(e);
                          }}
                        />
                        <Form.Input
                          fluid
                          name="keywords"
                          label={'Keywords (separated by comma " , ")'}
                          placeholder="Keywords"
                          required
                          onChange={event => {
                            this.inputHandler(event, "keywords");
                          }}
                        />
                      </Grid.Column>
                      <Grid.Column>
                        <Card centered>
                          <Image
                            onError={this.imgError}
                            src={
                              !this.state.modalImgErr
                                ? this.state.cardImageUrl
                                : "/static/assets/image-placeholder_3x2.svg"
                            }
                          />
                          <Card.Content>
                            <Card.Header>{this.state.title}</Card.Header>
                            <Card.Meta>
                              <span className="date">
                                {cate && this.state.category !== ""
                                  ? cate
                                  : "Post Category"}
                              </span>
                            </Card.Meta>
                            <Card.Description>
                              {this.state.cardDesc !== ""
                                ? this.state.cardDesc
                                : "Card Description"}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content extra>
                            <a>
                              <Icon name="calendar outline" />
                              {this.date.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "2-digit"
                              })}
                            </a>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <button
                    className="customhidden"
                    ref={this.submitButton}
                    type="submit"
                  >
                    Submit
                  </button>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={this.okayButtonHandler}
                  positive
                  loading={this.state.savingPost}
                  labelPosition="right"
                  icon="checkmark"
                  content="Start"
                  type="submit"
                />
                <Button
                  onClick={this.cancelButtonHandler}
                  negative
                  icon="close"
                  content="Close"
                  labelPosition="right"
                />
              </Modal.Actions>
            </Modal>
            <Grid className="gridpushup">
              <Grid.Row centered columns={3}>
                <Grid.Column tablet={2} computer={3} only="computer tablet" />
                <Grid.Column
                  mobile={16}
                  tablet={12}
                  computer={10}
                  className={"create-post-editor"}
                >
                  {this.state.postId !== "" ? (
                    <FroalaEditor
                      model={this.state.content}
                      onModelChange={this.handleModelChange}
                      tag="textarea"
                    />
                  ) : (
                    ""
                  )}
                  <div style={{ textAlign: "right" }}>
                    <Button.Group className={"create-post-button-group"}>
                      <Button
                        positive
                        loading={this.state.savingPost}
                        onClick={this.savePostHandler}
                      >
                        Save
                      </Button>
                      <Button.Or />
                      <Button onClick={this.cancelButtonHandler}>Cancel</Button>
                    </Button.Group>
                  </div>
                  <Divider horizontal>Output</Divider>
                  <div
                    className="fr-view"
                    dangerouslySetInnerHTML={{ __html: this.state.content }}
                  />
                </Grid.Column>
                <Grid.Column tablet={2} computer={3} only="computer tablet" />
              </Grid.Row>
            </Grid>
          </Fragment>
        ) : (
          <Dimmer active>
            <Loader size="massive">Loading</Loader>
          </Dimmer>
        )}
      </Layout>
    );
  }
}

export default withRouter(CreatePost);
