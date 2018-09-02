import React, { Component, Fragment } from "react";
import Head from "../components/head";
import { Layout } from "./layout";
import Image from "../components/ErrorProofImage/ErrorProofImage";
import { Grid, Divider } from "semantic-ui-react";
export class Contact extends Component {
  render() {
    return (
      <Layout>
        <Head
          title={"Wickedity | Contact"}
          metaTitle={"Wickedity | Contact"}
          metaKeywords={"wickedity, Contact"}
          url={typeof window !== "undefined" ? window.location.href : ""}
          metaDescription={"Contact the people at Wickedity.com"}
          orgTitle={"Wickedity | Contact"}
          orgDescription={"Contact the people at Wickedity.com"}
        />
        <div style={{ height: "100%", textAlign: "center" }}>
          <Grid
            verticalAlign="middle"
            container
            reversed="tablet vertically mobile"
            doubling
            stackable
            columns={2}
            className={"takeFullHeight"}
          >
            <Grid.Column>
              <h1>Contact Me</h1>
              <p style={{ color: "rgba(40,40,40,.3)", fontSize: "16px" }}>
                Email
              </p>
              <p>wickedwolfenstein@gmail.com</p>
            </Grid.Column>
            <Grid.Column>
              <Image
                src={"/static/assets/mail.png"}
                className={"catfather"}
                alt={"Mail Contact"}
                size="medium"
                style={{ margin: "auto" }}
              />
            </Grid.Column>
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default Contact;
