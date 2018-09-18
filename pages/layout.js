import React, { Component, Fragment } from "react";
import NextHead from "next/head";
import Header from "../components/Header/Header";
import { Link } from "../routes";
import { Dimmer, Loader, Message, Button } from "semantic-ui-react";
import Footer from "../components/Footer/Footer";
import { initStore } from "../Store/themeStore";
import { initUserStore } from "../Store/userStore";
let Store = null;
let userStore = null;
export class Layout extends Component {
  componentDidMount() {
    userStore = initUserStore();
    Store = initStore();
    this.forceUpdate();
    if (localStorage) {
      let cookieConsent = localStorage.getItem("cookieConsent");
      if (!cookieConsent) {
        this.setState({ visible: true });
      } else {
        this.setState({ visible: false });
      }
    }
  }
  state = { visible: true };

  handleDismiss = () => {
    if (localStorage) {
      localStorage.setItem("cookieConsent", true);
    }
    this.setState({ visible: false });
  };
  render() {
    return Store && userStore ? (
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
          <style>
            {
              'body,html{-webkit-overflow-scrolling:touch;height:100%}p{font-size:calc(18px + (22 - 19) * ((100vw - 300px)/ (1600 - 300)));line-height:calc(1.45em + (1.5 - 1.3) * ((100vw - 300px)/ (1600 - 300)))}.root{position:relative}.takeFullHeight{min-height:calc(83vh - 56px)}.bannerWithBoxShadow{padding:0;margin:0 0 60px;-webkit-box-shadow:0 50px 100px -30px rgba(0,0,0,.5);box-shadow:0 50px 100px -30px rgba(0,0,0,.5);border-radius:8px;overflow:hidden;width:100%}.userProfileMessage{position:fixed!important;top:0;left:auto;width:66%;z-index:201}.bannerbg,.catfather{width:100%}.ui.grid{margin-top:0;margin-bottom:0;margin-left:0!important;margin-right:0!important}svg.placeholder{width:100%;background:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggZD0iTTAgNCBMMCAyOCBMMzIgMjggTDMyIDQgeiBNNCAyNCBMMTAgMTAgTDE1IDE4IEwxOCAxNCBMMjQgMjR6IE0yNSA3IEE0IDQgMCAwIDEgMjUgMTUgQTQgNCAwIDAgMSAyNSA3Ij48L3BhdGg+Cjwvc3ZnPg==) center no-repeat #ccc;background-size:cover;height:0;padding:0;padding-bottom:calc(100% * 3 / 4)}.bannerbg{background-size:cover!important;background-position:center!important;height:400px;transition:all .4s cubic-bezier(.25,.1,.25,1) 0s;-webkit-transition:all .4s cubic-bezier(.25,.1,.25,1) 0s}.LSCatAdjust,.LSWolfAdjust{transition:all .2s cubic-bezier(.445,.05,.55,.95)}.gridpushup{padding-bottom:8rem!important}.masthead{min-height:480px;border-bottom:0!important}.formSegment{margin:4rem auto auto!important;width:83%}@media (min-width:860px){.formSegment{margin:4rem auto auto!important;width:66.666%}}.ui.rail{position:absolute;top:0;width:100px;height:100%;margin-top:2rem}@media (min-width:1300px){.formSegment{margin:4rem auto auto!important;width:33.333%}}.textCenterAlign{text-align:center}.centerAlign{margin:auto!important}.postEditedTime{font-size:1em;clear:both;color:rgba(0,0,0,.68);font-family:Lato,"Helvetica Neue",Arial,Helvetica,sans-serif}.mobileCenter{width:calc(100% - 2em)!important;margin-left:auto!important;margin-right:auto!important}.customheader{margin-bottom:0!important;border-radius:0!important;position:fixed}.footer{position:relative!important;width:100%;bottom:0}@media (min-width:0px) and (max-width:600px){.footer .ui.horizontal.list{display:block}.fr-view{width:calc(100% - 2em)!important;margin-left:auto!important;margin-right:auto!important}}@media (min-width:600px){.footer .ui.horizontal.list{display:inline-block}}div.clickable{position:relative}div.clickable .anchor-clickable{position:absolute;width:100%;height:100%;top:0;left:0;text-decoration:none;z-index:10;background-color:#fff;opacity:0;filter:alpha(opacity=1)}@media (max-width:767px){.SocialMediaShareButton{display:inline-block;margin-right:1rem}.cookieConsentMessage{position:fixed!important;z-index:201;width:100%;bottom:0}}@media (min-width:767px){.hideOnTabAbove{display:none!important}.cookieConsentMessage{position:fixed!important;z-index:201;width:33%;right:1%;bottom:0}}.SocialMediaShareButton>div{margin:auto auto .5rem}.socialShareButtons{margin-top:6rem;position:sticky;top:30%;left:0;display:inline-block}.socialShareAnimation{transform:translateX(-150px)!important;animation:come-out .8s ease forwards!important}.masthead h1.ui.header{margin-bottom:0;font-size:4em;font-weight:400;position:relative}.wolf{will-change:transform;position:absolute;left:50%;transform:translate(-50%);top:20px;width:300px;animation:float 7s ease-in-out infinite}@keyframes float{0%,100%{transform:translate(-50%,0)}50%{transform:translate(-50%,-20px)}}.come-in-even,.come-in-odd{transform:translateY(150px)!important}.come-in-odd{animation:come-in .8s ease forwards!important}.come-in-even{animation:come-in .6s ease forwards!important}.already-visible{transform:translateY(0)!important;animation:none}.LSCatAdjust{-webkit-transform:translate(0,.8em);transform:translate(0,.8em)}.LSWolfAdjust{-webkit-transform:translate(0,0);transform:translate(0,0)}@keyframes come-in{to{transform:translateY(0)}}@keyframes come-out{to{transform:translateX(0)}}.create-post-button-group{margin-top:10px!important}.create-post-editor{margin-top:-5px!important}.post-list{margin-top:1rem!important}.customhidden{display:none!important}.wrapperLDS input{display:none}.hideOnMob{display:none!important}@media (min-width:767px){.wrapperLDS label>*{-webkit-transform:translateZ(0) scale(1,1);transform:translateZ(0) scale(1,1)}.hideOnMob{display:flex!important}.logoutButton{padding:0;margin:0}.wrapperLDS{position:inherit;width:100px;height:50px;background:#f1f1f1;box-shadow:inset 0 0 5px 0 rgba(0,0,0,.1);border-radius:75px}.wrapperLDS .toggle--handler{background:linear-gradient(to bottom,#f5515f,#cd2942);width:40px;height:40px;display:block;box-shadow:0 5px 40px rgba(245,81,95,.8);border-radius:60px;margin:5px;cursor:pointer;position:relative;z-index:2;transition:all .2s cubic-bezier(.445,.05,.55,.95)}.wrapperLDS .toggle--handler:after,.wrapperLDS .toggle--handler:before{border-radius:60px;transition:all .2s;content:"";position:absolute}.wrapperLDS .toggle--handler:after{background:linear-gradient(to bottom,#468eff,#2b68ff);width:100%;height:100%;cursor:pointer;opacity:0}.wrapperLDS .toggle--handler:before{top:50%;left:50%;width:24px;height:24px;background-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 23.89"><title>sith_24X24</title><path d="M23.69,5,19.38,3.15a.57.57,0,0,0-.73.24.48.48,0,0,0,.26.66l4,1.74v5.16a.55.55,0,0,0,1.09,0V5.47A.5.5,0,0,0,23.69,5Z" transform="translate(0 0)"/><path d="M.55,11.45a.52.52,0,0,0,.55-.5V5.79L5.21,4a.48.48,0,0,0,.26-.66.57.57,0,0,0-.73-.24L.31,5A.5.5,0,0,0,0,5.47v5.47A.52.52,0,0,0,.55,11.45Z" transform="translate(0 0)"/><path d="M7.33,3.08,12,1l4.71,2a.59.59,0,0,0,.23,0,.55.55,0,0,0,.49-.28.48.48,0,0,0-.26-.66L12.23,0a.59.59,0,0,0-.47,0L6.86,2.18a.48.48,0,0,0-.26.66A.57.57,0,0,0,7.33,3.08Z" transform="translate(0 0)"/><path d="M23.45,12.44a.52.52,0,0,0-.55.5V18.1l-4,1.74a.48.48,0,0,0-.26.66.55.55,0,0,0,.49.28.59.59,0,0,0,.23,0l4.31-1.87a.5.5,0,0,0,.31-.45V12.94A.52.52,0,0,0,23.45,12.44Z" transform="translate(0 0)"/><path d="M5.21,19.89,1.09,18.1V12.94a.52.52,0,0,0-.55-.5.52.52,0,0,0-.55.5v5.47a.5.5,0,0,0,.31.45l4.43,1.92a.59.59,0,0,0,.23,0,.55.55,0,0,0,.49-.28A.48.48,0,0,0,5.21,19.89Z" transform="translate(0 0)"/><path d="M16.71,20.79l-4.71,2-4.67-2A.57.57,0,0,0,6.6,21a.48.48,0,0,0,.26.66l4.91,2.13a.59.59,0,0,0,.47,0l4.94-2.15a.48.48,0,0,0,.26-.66A.57.57,0,0,0,16.71,20.79Z" transform="translate(0 0)"/><path d="M13.68,7.17l.41-3,.14.06a.59.59,0,0,0,.23,0A.55.55,0,0,0,15,4a.48.48,0,0,0-.26-.66L12.23,2.25a.59.59,0,0,0-.47,0L9.32,3.32A.48.48,0,0,0,9.06,4a.57.57,0,0,0,.73.24l.12-.05.42,3L8,8.26,5.34,6.09a.46.46,0,0,0,.07-.52.57.57,0,0,0-.73-.24l-2.19,1a.5.5,0,0,0-.31.45V9a.52.52,0,0,0,.55.5.55.55,0,0,0,.45-.23l3.37,1.26v2.86L3.17,14.63a.55.55,0,0,0-.45-.23.52.52,0,0,0-.55.5v2.26a.5.5,0,0,0,.31.45l2.25,1a.59.59,0,0,0,.23,0,.55.55,0,0,0,.49-.28.46.46,0,0,0-.09-.55l2.84-2.09,2.09,1-.4,3-.12-.05a.57.57,0,0,0-.73.24.48.48,0,0,0,.26.66l2.45,1.06a.59.59,0,0,0,.23,0,.58.58,0,0,0,.23,0l2.4-1a.48.48,0,0,0,.26-.66.57.57,0,0,0-.73-.24l-.08,0-.4-3,2.09-1,2.9,2.14a.45.45,0,0,0,0,.44.55.55,0,0,0,.49.28.59.59,0,0,0,.23,0l2.12-.92a.5.5,0,0,0,.31-.45V14.89a.52.52,0,0,0-.55-.5.55.55,0,0,0-.45.23l-3.37-1.28V10.56l3.37-1.3a.55.55,0,0,0,.44.22.52.52,0,0,0,.55-.5V6.73a.5.5,0,0,0-.31-.45l-2.12-.92a.57.57,0,0,0-.73.24.45.45,0,0,0,0,.45l-2.9,2.14Zm2.5,2,3.49-2.57L20.73,7V8.23l-4,1.55a.5.5,0,0,0-.33.46l-.09,3.44c0,.2.22.38.42.46l4,1.53v1.18l-1.06.46-3.49-2.57a.59.59,0,0,0-.6-.05L12.85,16a.49.49,0,0,0-.29.5l.49,3.67L12,20.63l-1.06-.46.49-3.67a.49.49,0,0,0-.29-.5L8.41,14.67a.59.59,0,0,0-.6.05L4.32,17.3l-1.05-.46V15.66l4-1.49a.5.5,0,0,0,.34-.46V10.19a.5.5,0,0,0-.34-.46l-4-1.5V7l1-.45,3.3,2.64A.58.58,0,0,0,8,9.36a.59.59,0,0,0,.25-.06l3-1.42a.49.49,0,0,0,.29-.5l-.52-3.67L12,3.25l1.06.46-.51,3.67a.49.49,0,0,0,.29.5l2.75,1.32a.58.58,0,0,0,.25.06A.58.58,0,0,0,16.18,9.16Z" transform="translate(0 0)"/><polyline points="3.27 7.04 4.31 6.59 7.97 9.36 11.47 7.51 10.95 3.71 12 3.25 13.05 3.71 12.6 7.57 15.84 9.27 19.67 6.59 20.73 7.04 20.73 8.23 16.45 9.94 16.35 13.82 20.73 15.66 20.73 16.84 19.67 17.3 15.77 14.73 12.56 16.28 13.06 20.17 12 20.63 10.94 20.17 11.44 16.5 8.06 14.7 4.33 17.3 3.27 16.84 3.27 15.66 7.3 14.17 7.45 9.94 3.27 8.22"/></svg>\');'
            }
          </style>
          <style>
            {
              '-webkit-transform:translate(-50%,-50%) rotate(180deg);transform:translate(-50%,-50%) rotate(180deg)}.wrapperLDS:after{content:"";position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:80px;height:2px;background:#e5e5e5;pointer-events:none}.wrapperLDS input{position:absolute;left:-999em}.wrapperLDS input:checked+.toggle .toggle--handler{-webkit-transform:translateX(50px);transform:translateX(50px);background:linear-gradient(to bottom,#468eff,#2b68ff);box-shadow:0 5px 40px rgba(70,142,255,.8)}.wrapperLDS input:checked+.toggle .toggle--handler:after{opacity:1}.wrapperLDS input:checked+.toggle .toggle--handler:before{background-image:url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.cls-1{fill:#fff;}</style></defs><title>rebel-alliance_24x24</title><path class="cls-1" d="M19,2.26l-.25-.18a.5.5,0,0,0-.56.83l.2.14c2.75,2,1.92,6.09,1.6,7.31C19,14,16.61,14,16.52,14h-.1A1.94,1.94,0,0,1,15,13.55a4,4,0,0,1-1-3.06,5.6,5.6,0,0,1,2.73-5.06.5.5,0,0,0,.19-.72l-1-1.5A.5.5,0,0,0,15.28,3,9.19,9.19,0,0,0,13.6,4.25,11.14,11.14,0,0,1,14,2.65a.5.5,0,0,0-.07-.46l-1.5-2a.52.52,0,0,0-.8,0l-1.5,2a.5.5,0,0,0-.07.46,11.14,11.14,0,0,1,.37,1.6A9.19,9.19,0,0,0,8.72,3a.5.5,0,0,0-.64.17l-1,1.5a.5.5,0,0,0,.19.72A5.65,5.65,0,0,1,10,10.49a4,4,0,0,1-1,3.06A1.94,1.94,0,0,1,7.58,14h-.1C7.39,14,5,14,4,10.36,3.66,9.15,2.83,5.1,5.58,3.06l.2-.14a.5.5,0,0,0-.56-.83L5,2.26A12,12,0,1,0,19,2.26Z" transform="translate(0 0)"/></svg>\');z-index:5;-webkit-transform:translate(-50%,-50%) rotate(0);transform:translate(-50%,-50%) rotate(0)}}a[href="https://froala.com/wysiwyg-editor"],a[href="https://www.froala.com/wysiwyg-editor?k=u"]{display:none!important;position:absolute;top:-99999999px}#nav-icon1 span,#nav-icon3 span,#nav-icon4 span{display:none}.hideHeaderDrop{display:flex}@media (max-width:767px){.hideHeaderDrop{display:none!important}.hideOnTabAbove{display:block}.navMarginLeft{margin-left:auto}#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4{width:32px;height:28px;position:relative;-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0);-webkit-transition:.5s ease-in-out;-moz-transition:.5s ease-in-out;-o-transition:.5s ease-in-out;transition:.5s ease-in-out;cursor:pointer}#nav-icon1 span,#nav-icon3 span,#nav-icon4 span{display:block;position:absolute;height:5px;width:100%;background:#fff;border-radius:5px;opacity:1;left:0;-webkit-transform:rotate(0);-moz-transform:rotate(0);-o-transform:rotate(0);transform:rotate(0);-webkit-transition:.25s ease-in-out;-moz-transition:.25s ease-in-out;-o-transition:.25s ease-in-out;transition:.25s ease-in-out}#nav-icon3 span:nth-child(1){top:0}#nav-icon3 span:nth-child(2),#nav-icon3 span:nth-child(3){top:10px}#nav-icon3 span:nth-child(4){top:20px}#nav-icon3.open span:nth-child(1),#nav-icon3.open span:nth-child(4){top:10px;width:0%;left:50%}#nav-icon3.open span:nth-child(2){-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}#nav-icon3.open span:nth-child(3){-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}}.fadeIn{animation-name:fadeIn;animation-fill-mode:both;animation-duration:2s}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}.slideInDown{animation-name:slideInDown;animation-duration:.3s}@keyframes slideInDown{0%{transform:translate3d(0,-10%,0);visibility:visible}to{transform:translateZ(0)}}'
            }
          </style>
          <link
            rel="stylesheet"
            href="/static/assets/semantic-ui-css/semantic.min.css"
          />
        </NextHead>
        <Header store={Store} userStore={userStore} />
        {this.state.visible ? (
          <Message
            onDismiss={this.handleDismiss}
            className="cookieConsentMessage fadeIn"
            compact
            color="black"
            size="mini"
            id={"Cookie Consent Popup"}
          >
            <Message.Content>
              <p style={{ fontSize: "14px", color: "white" }}>
                This website uses cookies/Storage to ensure you get the best
                experience on our website.
              </p>
              <div style={{ textAlign: "center" }}>
                <Link href="/terms">
                  <Button size="mini" color="blue">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Message.Content>
          </Message>
        ) : (
          ""
        )}
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
