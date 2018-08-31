import React, { Component } from "react";
import { Menu, Segment, Button } from "semantic-ui-react";
import { Link } from "../../routes";
import LightDarkSwitch from "../LightDarkSwitch/LightDarkSwitch";
import { observer } from "mobx-react";
@observer
export class Header extends Component {
  menuClickHandler = e => {
    this.props.store.toggleDropdown();
    e.preventDefault();
  };
  render() {
    let Store = this.props.store;
    let userStore = this.props.userStore;
    return (
      <Segment
        inverted
        fixed={"top"}
        color={(Store && Store.headerColor) || "blue"}
        className="customheader"
      >
        <Menu
          inverted
          secondary
          color={(Store && Store.headerColor) || "blue"}
          stackable
        >
          <Link prefetch href="/">
            <Menu.Item>
              <img
                src="/static/assets/WolfLogo_1x.png"
                width={"32px"}
                alt={"logo"}
              />
              {userStore && userStore.isAuth ? (
                <Button
                  basic
                  circular
                  icon="power off"
                  className={"hideOnTabAbove"}
                  style={{ marginLeft: "auto", marginRight: "1rem" }}
                  onClick={() => userStore.logoutUser()}
                />
              ) : (
                undefined
              )}
              <div
                id="nav-icon3"
                onClick={this.menuClickHandler}
                className={
                  (userStore && !userStore.isAuth ? "navMarginLeft " : "") +
                  (Store && Store.dropdownMenuOpen ? "open" : "")
                }
              >
                <span />
                <span />
                <span />
                <span />
              </div>
            </Menu.Item>
          </Link>
          <div
            className={
              Store && !Store.dropdownMenuOpen
                ? "hideHeaderDrop"
                : "slideInDown"
            }
          >
            <Link prefetch href="/">
              <Menu.Item className="item">Home</Menu.Item>
            </Link>

            {userStore && userStore.isAuth ? (
              <Link prefetch href="/createpost">
                <Menu.Item className="item">Add</Menu.Item>
              </Link>
            ) : (
              undefined
            )}
            <Link prefetch href="/posts">
              <Menu.Item className="item">Posts</Menu.Item>
            </Link>
            {userStore && userStore.isAuth ? (
              <Link prefetch href="/profile">
                <Menu.Item className="item">Profile</Menu.Item>
              </Link>
            ) : (
              undefined
            )}
            {/* <Link
            exact={true}
            activeClassName="active"
            className="item"
            to="/register"
          >
            Register
          </Link>
          <Link
            exact={true}
            activeClassName="active"
            className="item"
            to="/login"
          >
            Login
          </Link> */}
          </div>
          <Menu.Menu position="right" className="LDSHeader hideOnMob">
            {userStore && userStore.isAuth ? (
              <Menu.Item onClick={() => userStore.logoutUser()}>
                <Button basic circular icon="power off" />
              </Menu.Item>
            ) : (
              undefined
            )}
            <Menu.Item className="hideOnMob">
              {Store ? <LightDarkSwitch store={Store} /> : ""}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

export default Header;
