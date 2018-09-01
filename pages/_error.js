import React from "react";
import Image from "../components/ErrorProofImage/ErrorProofImage";
import { Button, Grid } from "semantic-ui-react";
import { withRouter } from "next/router";
import Head from "../components/head";
import Router from "next/router";
import { Layout } from "./layout";
const ErrorPage = props => {
  const redirectToHome = () => {
    Router.push("/");
  };
  return (
    <Layout>
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
          <Head
            title={"Error occurred"}
            metaTitle={"Wickedity | Error Page"}
            metaKeywords={"blog technology science error page"}
            metaDescription={"Blog about all the things I find intresting!!"}
            orgTitle={"Wickedity | Error Page"}
            orgDescription={"Blog about all the things I find intresting!!"}
          />
          <Grid.Column>
            <h1>Page has been burned.</h1>
            <br />
            <p>
              <strong>Catfather : </strong>
              You didn't see anything here.. Capiche?!!
            </p>
            <p>
              <strong>Goon 1 : </strong>
              Click the button below and go
              <strong> home</strong> or you'll be sleepin with the fishes!!
            </p>
            <div className={"textCenterAlign"}>
              <Button
                onClick={redirectToHome}
                positive
                className={"centerAlign"}
              >
                Home
              </Button>
            </div>
          </Grid.Column>
          <Grid.Column>
            <Image
              src={"/static/assets/themafiagroup.png"}
              className={"catfather"}
              alt={"Catfather and his goons"}
            />
          </Grid.Column>
        </Grid>
      </div>
    </Layout>
  );
};

export default withRouter(ErrorPage);
