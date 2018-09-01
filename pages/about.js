import React, { Component, Fragment } from "react";
import Head from "../components/head";
import { Layout } from "./layout";
import { Grid, Divider, Item, Icon } from "semantic-ui-react";
import Image from "../components/ErrorProofImage/ErrorProofImage";
export class About extends Component {
  render() {
    return (
      <Layout>
        <Head
          title={"Wickedity | About"}
          metaTitle={"Wickedity | About"}
          metaKeywords={"wickedity, About the Creator of Wickedity.com"}
          url={typeof window !== "undefined" ? window.location.href : ""}
          metaDescription={"About the Creator of Wickedity.com"}
          orgTitle={"Wickedity | About"}
          orgDescription={"About the Creator of Wickedity.com"}
        />
        <div style={{ height: "100%" }}>
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
              <h1>Praveen</h1>
              <p style={{ color: "rgba(40,40,40,.3)", fontSize: "16px" }}>
                Wolfenstein
              </p>
              <p>
                Developer, hobby trader, loves to code and wants to work on Wall
                Street.
              </p>
              <br />
              <h3>Contact Me</h3>
              <p style={{ color: "rgba(40,40,40,.3)", fontSize: "16px" }}>
                Email
              </p>
              <p>wickedwolfenstein@gmail.com</p>
            </Grid.Column>
            <Grid.Column>
              <Image
                circular
                src={"/0.png"}
                className={"catfather"}
                alt={"Wolfenstein"}
              />
            </Grid.Column>
          </Grid>
        </div>
      </Layout>
    );
  }
}

export default About;
