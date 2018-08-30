import React, { Component } from "react";
import { Menu, Segment, Button } from "semantic-ui-react";
import { Link } from "../../routes";
import userStore from "../../Store/userStore";
import LightDarkSwitch from "../LightDarkSwitch/LightDarkSwitch";
import { observer } from "mobx-react";
@observer
export class Header extends Component {
  menuClickHandler = e => {
    this.Store.toggleDropdown();
    e.preventDefault();
  };
  render() {
    let Store = this.props.store;
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
          <Link href="/">
            <Menu.Item>
              <img
                src="/static/assets/WolfLogo_1x.png"
                width={"32px"}
                alt={"logo"}
              />
              {userStore.isAuth ? (
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
                  (!userStore.isAuth ? "navMarginLeft " : "") +
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
            <Link href="/">
              <Menu.Item className="item">Home</Menu.Item>
            </Link>

            {userStore.isAuth ? (
              <Link href="/createpost">
                <Menu.Item className="item">Add</Menu.Item>
              </Link>
            ) : (
              undefined
            )}
            <Link href="/posts">
              <Menu.Item className="item">Posts</Menu.Item>
            </Link>
            {userStore.isAuth ? (
              <Link href="/profile">
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
            {userStore.isAuth ? (
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
