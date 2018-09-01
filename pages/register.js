import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { withRouter } from "next/router";
import { observer } from "mobx-react";
import setAuthToken from "../utils/isEmpty";
import initUserStore from "../Store/userStore";
import Layout from "./layout";
import Head from "../components/head";
import Router from "next/router";
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
class Registeration extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password_confirm: ""
  };

  componentDidMount() {
    Router.prefetch("/");
    Router.prefetch("/login");
    UserStore = initUserStore();
    if (localStorage.jwtToken) {
      const decoded = jwt_decode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        UserStore.logoutUser(this.props.history);
      } else {
        setAuthToken(localStorage.jwtToken);
        UserStore.setCurrentUser(decoded);
      }
    }
    if (UserStore.isAuth) {
      Router.push("/");
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const password_confirm = data.get("password_confirm");

    const user = {
      name,
      email,
      password,
      password_confirm
    };
    UserStore.registerUser(user);
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
          title={"Wickedity | Registration"}
          metaTitle={"Wickedity | Registration"}
          metaKeywords={"wickedity,Registration"}
          url={typeof window !== "undefined" ? window.location.href : ""}
          metaDescription={"Login to start posting on this site."}
          orgTitle={"Wickedity | Registration"}
          orgDescription={"Register to start posting on this site."}
        />
        <Grid className={"takeFullHeight"}>
          <Grid.Row centered columns={3}>
            <Grid.Column tablet={2} computer={3} only="computer" />
            <Grid.Column
              mobile={16}
              tablet={12}
              computer={10}
              className={"create-post-editor"}
            >
              <Segment textAlign="left" raised className="formSegment">
                <Header size="medium" className="textCenterAlign">
                  Register
                </Header>
                <Form
                  onSubmit={this.handleSubmit}
                  error={keys && keys.length > 0}
                >
                  <Message error>
                    <Message.Header>Error Occured</Message.Header>
                    <Message.List>{errMessages}</Message.List>
                  </Message>
                  <Form.Field
                    error={
                      UserStore && UserStore.errors && UserStore.errors.name
                        ? true
                        : false
                    }
                  >
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      name="name"
                      onChange={this.handleInputChange}
                      value={this.state.name}
                    />
                  </Form.Field>
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
                      className="form-control"
                      name="email"
                      onChange={this.handleInputChange}
                      value={this.state.email}
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
                      className="form-control"
                      name="password"
                      onChange={this.handleInputChange}
                      value={this.state.password}
                    />
                  </Form.Field>
                  <Form.Field
                    error={
                      UserStore &&
                      UserStore.errors &&
                      UserStore.errors.password_confirm
                        ? true
                        : false
                    }
                  >
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="form-control"
                      name="password_confirm"
                      onChange={this.handleInputChange}
                      value={this.state.password_confirm}
                    />
                  </Form.Field>
                  <Button type="submit">Register</Button>
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

export default withRouter(Registeration);
