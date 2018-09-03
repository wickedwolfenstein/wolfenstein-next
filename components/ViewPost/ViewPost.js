import React, { Fragment } from "react";
import NextHead from "next/head";
import Image from "../ErrorProofImage/ErrorProofImage";
import OnVisible from "react-on-visible";
import Prism from "./prism";
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
  let postContent = props.post.content;
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

  const transformCodeBlocks = content => {
    if (content) {
      let codeBlocks = content.match(/<p class="srcCode".*?>.*?<\/p>/gs);
      for (let index in codeBlocks) {
        let codeBlock = codeBlocks[index];
        let parts = /^<p[\s]*class="srcCode"[\s]*data="(.*?)"[\s]*type="(.*?)">.*?<\/p>$/gs.exec(
          codeBlock
        );
        if (parts != null) {
          codeBlock = parts[1];
          let type = parts[2];
          codeBlock = codeBlock
            .replace(/^<p.*?>/gs, "")
            .replace(/<\/p>$/gs, "");
          let codeBlockHtml = Prism.highlight(codeBlock, Prism.languages[type]);
          codeBlock =
            '<pre><code class="language-' +
            type +
            '">' +
            codeBlockHtml +
            "</code></pre>";
        } else {
          // prettier-ignore-next-statement
          codeBlock = `
<pre class="line-numbers"><code class="language-scss">
<span class="token variable">Error Occured</span>
<br><span class="token keyword">The format for Code Snippet is </span>
<br><span class="token function">&lt;p class="srcCode" data="Code here" type="Type of Code"&gt;
Placeholder Name
&lt;/p&gt; </span> 
</code></pre>`;
        }
        content = content.replace(codeBlocks[index], codeBlock);
        return content;
      }
    } else {
      return content;
    }
  };

  postContent = transformCodeBlocks(postContent);

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
        <NextHead>
          <link
            rel="stylesheet"
            href="/static/assets/font-awesome/css/font-awesome.css"
          />
          <link rel="stylesheet" href="/static/codeView.css" />
        </NextHead>
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
                  media={
                    props.post ? (
                      props.post.card.cardImage
                    ) : (
                      <svg className="placeholder" width="100%" height="100%" />
                    )
                  }
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
              dangerouslySetInnerHTML={{ __html: postContent }}
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
                media={props.post ? props.post.card.cardImage : ""}
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
                  className={"fr-view"}
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
