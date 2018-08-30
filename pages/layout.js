import React, { Component, Fragment } from "react";
import initStore from "../Store/themeStore";
import NextHead from "next/head";
import Header from "../components/Header/Header";
import { Dimmer, Loader } from "semantic-ui-react";
import Footer from "../components/Footer/Footer";
let Store = null;
export class Layout extends Component {
  componentDidMount() {
    Store = initStore();
    this.forceUpdate();
  }

  render() {
    return Store ? (
      <Fragment>
        <NextHead>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
          <link rel="apple-touch-icon" href="/static/touch-icon.png" />
          <link
            rel="mask-icon"
            href="/static/favicon-mask.svg"
            color="#49B882"
          />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/static/App.css" />
          <link
            rel="stylesheet"
            href="/static/assets/semantic-ui-css/semantic.min.css"
          />
        </NextHead>
        <Header store={Store} />
        {this.props.children}
        <Footer />
      </Fragment>
    ) : (
      <div className={"takeFullHeight"}>
        <NextHead>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
          <link rel="apple-touch-icon" href="/static/touch-icon.png" />
          <link
            rel="mask-icon"
            href="/static/favicon-mask.svg"
            color="#49B882"
          />
          <link rel="icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/static/App.css" />
          <link
            rel="stylesheet"
            href="/static/assets/semantic-ui-css/semantic.min.css"
          />
        </NextHead>
        {this.props.children}
        <Dimmer active>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
      </div>
    );
  }
}

export default Layout;
