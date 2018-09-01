import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter } from "next/router";
import Router from "next/router";
import Head from "../components/head";
import jwt_decode from "jwt-decode";
import { initUserStore } from "../Store/userStore";
import setAuthToken from "../utils/setAuthToken";
import Layout from "./layout";
import {
  Button,
  Form,
  Grid,
  Segment,
  Message,
  Header
} from "semantic-ui-react";
let UserStore = null;
@observer
class Login extends Component {
  state = {
    email: "",
    sentPost: false
  };

  componentDidMount() {
    UserStore = initUserStore();
    Router.prefetch("/");
    Router.prefetch("/register");
    if (
      Router.router.query.redirectPage &&
      Router.router.query.redirectPage !== ""
    ) {
      Router.prefetch("/" + Router.router.query.redirectPage);
    }
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        UserStore.logoutUser();
      } else {
        setAuthToken(localStorage.jwtToken);
        UserStore.setCurrentUser(decoded);
      }
    }
    if (UserStore.isAuth) {
      //Router.pushRoute("/");
      Router.push("/");
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  registerButtonClickHandler = e => {
    e.preventDefault();
    Router.pushRoute("/register");
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const user = {
      email,
      password
    };
    let redirPath = "/";

    if ((((Router || {}).router || {}).query || {}).redirectPage) {
      redirPath = "/" + Router.router.query.redirectPage;
    }
    UserStore.loginUser(user, redirPath);
    this.setState({ updated: !this.state.updated });
  };

  render() {
    let keys = undefined;
    let errMessages = undefined;
    if (UserStore !== null) {
      keys = Object.keys(UserStore.errors);
      errMessages = keys.map(x => {
        return <Message.Item key={x}>{UserStore.errors[x]}</Message.Item>;
      });
    }

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
        <Grid doubling stackable className={"takeFullHeight"}>
          <Grid.Row centered columns={3}>
            <Grid.Column tablet={2} computer={3} only="computer tablet" />
            <Grid.Column
              mobile={16}
              tablet={12}
              computer={10}
              className={"create-post-editor"}
            >
              <Segment textAlign="left" raised className="formSegment">
                <Header size="medium" className="textCenterAlign">
                  Login
                </Header>
                <Form
                  onSubmit={this.handleSubmit}
                  error={keys !== undefined && keys.length > 0}
                >
                  <Message error>
                    <Message.Header>Error Occured</Message.Header>
                    <Message.List>{errMessages}</Message.List>
                  </Message>
                  <Form.Field
                    error={
                      UserStore && UserStore.errors && UserStore.errors.email
                        ? true
                        : false
                    }
                  >
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      autoComplete="email"
                    />
                  </Form.Field>
                  <Form.Field
                    error={
                      UserStore && UserStore.errors && UserStore.errors.password
                        ? true
                        : false
                    }
                  >
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      autoComplete="password"
                    />
                  </Form.Field>
                  <Button type="submit">Login</Button>
                  <Button
                    floated="right"
                    type="button"
                    onClick={this.registerButtonClickHandler}
                  >
                    Register
                  </Button>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column tablet={2} computer={3} only="computer tablet" />
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default withRouter(Login);
