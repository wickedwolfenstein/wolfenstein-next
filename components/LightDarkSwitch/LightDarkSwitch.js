import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
export class LightDarkSwitch extends Component {
  clickHandler = () => {
    this.props.store.toggleTheme();
  };
  checkboChangedhandler = () => {};
  render() {
    return (
      <div className="wrapperLDS" onClick={this.clickHandler}>
        <input
          id="dn"
          type="checkbox"
          onChange={this.checkboChangedhandler}
          checked={this.props.store.themeToggle}
        />
        <label
          className={this.props.store.themeToggle ? "toggle" : ""}
          htmlFor="dn"
        >
          <span className="toggle--handler" onClick={this.clickHandler} />
        </label>
      </div>
    );
  }
}

export default LightDarkSwitch;
