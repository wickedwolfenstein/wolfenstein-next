import React, { Fragment } from "react";
import Image from "../ErrorProofImage/ErrorProofImage";
import OnVisible from "react-on-visible";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  PinterestShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon,
  PinterestIcon,
  EmailIcon
} from "react-share";
import { Grid, Divider, Loader, Dimmer } from "semantic-ui-react";

import Disqus from "disqus-react";

export const ViewPost = props => {
  const disqusShortname = "wickedity";
  let disqusConfig = undefined;
  if (
    props.post._id &&
    props.post._id !== "" &&
    props.post.title &&
    props.post.title !== ""
  ) {
    disqusConfig = {
      url: typeof window !== "undefined" ? window.location.href : "",
      identifier: props.post._id,
      title: props.post.title
    };
  }
  return (
    <Fragment>
      <Grid
        verticalAlign="middle"
        container
        reversed="tablet vertically mobile"
        doubling
        stackable
        columns={2}
        className={"takeFullHeight"}
      >
        <Dimmer active={!props}>
          <Loader active={!props} size="huge" inline="centered">
            Loading..
          </Loader>
        </Dimmer>
        <Grid.Column>
          {props.post ? (
            <Fragment>
              <h1>{props.post.title}</h1>
              <p>{props.post.card.description}</p>
              <h3>{"By " + props.post.author}</h3>
              <p className="postEditedTime">
                {new Date(props.post.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "2-digit"
                }) || props.post.card.extraInfo}
              </p>
            </Fragment>
          ) : (
            undefined
          )}
        </Grid.Column>
        <Grid.Column>
          {props.post ? (
            <Image
              src={props.post.heroImage || props.post.card.cardImage}
              className={"catfather bannerWithBoxShadow"}
              alt={props.post.title}
            />
          ) : (
            <svg
              className="placeholder bannerWithBoxShadow"
              width="100%"
              height="100%"
            />
          )}
        </Grid.Column>
      </Grid>
      <Grid className={"gridpushup"}>
        <Grid.Row>
          <Grid.Column tablet={2} computer={3} only="computer tablet">
            <OnVisible
              visibleClassName={"socialShareAnimation"}
              style={{ position: "sticky", top: "10%" }}
              percent={25}
            >
              <div className={"socialShareButtons"}>
                <FacebookShareButton
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                >
                  <FacebookIcon size={48} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                >
                  <TwitterIcon size={48} round />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                >
                  <WhatsappIcon size={48} round />
                </WhatsappShareButton>
                <PinterestShareButton
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                  media={props.post ? props.post.card.cardImage : "/0.png"}
                >
                  <PinterestIcon size={48} round />
                </PinterestShareButton>
                <RedditShareButton
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                >
                  <RedditIcon size={48} round />
                </RedditShareButton>
                <EmailShareButton
                  url={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                >
                  <EmailIcon size={48} round />
                </EmailShareButton>
              </div>
            </OnVisible>
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={12}
            computer={10}
            className={"create-post-editor"}
          >
            <Divider hidden />

            <div
              className="fr-view"
              dangerouslySetInnerHTML={{ __html: props.post.content }}
            />

            <Divider section hidden />
            <div className="textCenterAlign hideOnTabAbove">
              <FacebookShareButton
                url={typeof window !== "undefined" ? window.location.href : ""}
              >
                <FacebookIcon size={48} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={typeof window !== "undefined" ? window.location.href : ""}
              >
                <TwitterIcon size={48} round />
              </TwitterShareButton>
              <WhatsappShareButton
                url={typeof window !== "undefined" ? window.location.href : ""}
              >
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>
              <PinterestShareButton
                url={typeof window !== "undefined" ? window.location.href : ""}
                media={props.post ? props.post.card.cardImage : "/0.png"}
              >
                <PinterestIcon size={48} round />
              </PinterestShareButton>
              <RedditShareButton
                url={typeof window !== "undefined" ? window.location.href : ""}
              >
                <RedditIcon size={48} round />
              </RedditShareButton>
              <EmailShareButton
                url={typeof window !== "undefined" ? window.location.href : ""}
              >
                <EmailIcon size={48} round />
              </EmailShareButton>
            </div>
            {disqusConfig ? (
              <Fragment>
                <Disqus.CommentCount
                  shortname={disqusShortname}
                  config={disqusConfig}
                >
                  Comments
                </Disqus.CommentCount>
                <Disqus.DiscussionEmbed
                  shortname={disqusShortname}
                  config={disqusConfig}
                />
              </Fragment>
            ) : (
              ""
            )}
          </Grid.Column>
          <Grid.Column tablet={2} computer={3} only="computer tablet" />
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default ViewPost;
