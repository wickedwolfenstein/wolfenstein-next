import React, { Fragment } from "react";
import { Segment, List } from "semantic-ui-react";
import Link from "next/link";
const Footer = props => {
  return (
    <Segment className={"footer"}>
      {typeof window !== "undefined" && window.innerWidth > 600 ? (
        <Fragment>
          <List floated="right" horizontal>
            <List.Item>
              <Link href="/terms">
                <a className="item">Terms</a>
              </Link>
            </List.Item>
            <List.Item>
              <Link href="/privacy">
                <a className="item">Privacy</a>
              </Link>
            </List.Item>
            <List.Item>
              <Link href="/contact">
                <a className="item">Contact</a>
              </Link>
            </List.Item>
            <List.Item disabled href="#">
              Created By Wolfenstein
            </List.Item>
          </List>
          <List horizontal relaxed>
            <List.Item>
              <Link href="/about">
                <a className="item">About</a>
              </Link>
            </List.Item>
          </List>
        </Fragment>
      ) : (
        <Fragment>
          <List horizontal className="textCenterAlign centerAlign">
            <List.Item>
              <Link href="/terms">
                <a className="item">Terms</a>
              </Link>
            </List.Item>
            <List.Item>
              <Link href="/privacy">
                <a className="item">Privacy</a>
              </Link>
            </List.Item>
            <List.Item>
              <Link href="/contact">
                <a className="item">Contact</a>
              </Link>
            </List.Item>
            <List.Item>
              <Link href="/about">
                <a className="item">About</a>
              </Link>
            </List.Item>
          </List>
          <List className="textCenterAlign">
            <List.Item disabled href="#">
              <p>Created By Wolfenstein</p>
            </List.Item>
          </List>
        </Fragment>
      )}
    </Segment>
  );
};

export default Footer;
