import React, { Component, Fragment } from "react";
import Layout from "./layout";
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
  Icon
} from "semantic-ui-react";
import api from "../config/Axios/axios";
import NextHead from "next/head";
import dynamic from "next/dynamic";
import $ from "jquery";
import "froala-editor/js/froala_editor.pkgd.min.js";
let FroalaEditor = dynamic(import("react-froala-wysiwyg"));
if (typeof window !== "undefined") {
  window.$ = window.jQuery = $;
  //FroalaEditor = require("react-froala-wysiwyg");
}

import { withRouter } from "../routes";
export class EditPost extends Component {
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
    api.get("/category").then(res => {
      if (res.data) {
        const categories = res.data.map(item => {
          return {
            key: item.key,
            text: item.text,
            value: item.value
          };
        });
        console.log(this.props);
        if (this.props.url.pathname) {
          const urlParts = this.props.url.pathname.split("/").filter(x => x);
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
    this.props.history.push("/");
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
          <script src="/static/assets/froala-editor/js/froala_editor.pkgd.min.js" />
        </NextHead>
        <FroalaEditor
          model={this.state.content}
          onModelChange={this.handleModelChange}
          tag="textarea"
        />
      </Layout>
    );
  }
}

export default EditPost;
