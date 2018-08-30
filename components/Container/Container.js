import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

export class Container extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row centered columns={3}>
          <Grid.Column width={3} />
          <Grid.Column width={10}>{this.props.children}</Grid.Column>
          <Grid.Column width={3} />
        </Grid.Row>
      </Grid>
    );
  }
}

export default Container;
