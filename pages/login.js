import React, { Fragment } from "react";
import Layout from "./layout";
import Head from "../components/head";
import jwt_decode from "jwt-decode";
import UserStore from "../Store/userStore";
import setAuthToken from "../utils/setAuthToken";
import { Router } from "../routes";
import {
  Button,
  Form,
  Grid,
  Segment,
  Message,
  Header
} from "semantic-ui-react";
import { observer } from "mobx-react";

@observer
export class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {},
    from: ""
  };

  componentDidMount() {
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
      Router.pushRoute("/");
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
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    let redirPath = "/";
    if (
      ((((this.props || {}).location || {}).state || {}).from || {}).pathname
    ) {
      redirPath = this.props.location.state.from.pathname;
    }
    UserStore.loginUser(user, redirPath);
  };

  render() {
    const keys = Object.keys(UserStore.errors);
    const errMessages = keys.map(x => {
      return <Message.Item key={x}>{UserStore.errors[x]}</Message.Item>;
    });
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
                <Form onSubmit={this.handleSubmit} error={keys.length > 0}>
                  <Message error>
                    <Message.Header>Error Occured</Message.Header>
                    <Message.List>
                      {errMessages ? errMessages : ""}
                    </Message.List>
                  </Message>
                  <Form.Field
                    error={
                      UserStore.errors && UserStore.errors.email ? true : false
                    }
                  >
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={this.handleInputChange}
                      value={this.state.email}
                    />
                  </Form.Field>
                  <Form.Field
                    error={
                      UserStore.errors && UserStore.errors.password
                        ? true
                        : false
                    }
                  >
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleInputChange}
                      value={this.state.password}
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

export default Login;
