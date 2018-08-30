import React, { Fragment, Component } from 'react';
import { Image } from 'semantic-ui-react';
export class ErrorProofImage extends Component {
  state = {
    error: false,
  };
  imgErrHandler = () => {
    this.setState({
      error: true,
    });
  };
  render() {
    const img = !this.state.error ? (
      <Image {...this.props} onError={this.imgErrHandler}>
        {this.props.children}
      </Image>
    ) : (
      <svg className="placeholder" width="100%" height="100%" />
    );
    return <Fragment>{img}</Fragment>;
  }
}

export default ErrorProofImage;
